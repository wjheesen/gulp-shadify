import * as File from "vinyl";
import * as tsTypeInfo from "ts-type-info";
import * as through2 from 'through2';
import * as stream from  'stream';
import * as GLSLX from 'glslx';

export = function shadify(){
    return through2.obj(function (file: File, encoding, callback) {

        // Compile program
        let result = GLSLX.compile(file.contents.toString(), {
                disableRewriting: false,
                format: "json",
                keepSymbols: false,
                prettyPrint: false,
                renaming: "all" 
        });
        
        // Check for compilation errors
        if(result.log){
            let errorMsg = result.log.replace("<stdin>", file.relative)
            console.error(errorMsg);
            return;
        }
        
        // Parse program 
        let program = <GLSLX.Program> JSON.parse(result.output);
        let programName = getProgramName(file);
        let shaders = program.shaders;
        let renaming = program.renaming;
        let vs = shaders[0].contents;
        let fs = shaders[1].contents;
        let uniforms = <Variable[]> [];
        let attribs = <Variable[]> [];

        // Extract variables
        for(let property in renaming){
            let variable = { name: renaming[property], alias: property };
            if(property.indexOf("u_") === 0){
                uniforms.push(variable) // Uniform must start with "u_"
            } else if(property.indexOf("a_") === 0) {
                attribs.push(variable)  // Attrib must start with "a_"
            }
        }

        // Create ts file
        let tsFile = tsTypeInfo.createFile();

        // Import the createProgram function
        let createProgram = "createProgramFromSources";
        tsFile.addImport({
                namedImports: [{name: createProgram}],
                moduleSpecifier: "gulp-shadify/program"
        });

        // Add function to create program
        tsFile.addFunction({
            name: `create${programName}`,
            parameters: [{name: 'gl', type: 'WebGLRenderingContext'}],
            documentationComment: `Creates a new ${programName}.`,
            isExported: true,
            onWriteFunctionBody: writer => {
                writer.write(`let program = ${createProgram}(gl, "${vs}", "${fs}");`)
                writer.newLine().write("return").block(() => {
                    writer.newLine().write(`location: program,`)
                    uniforms.forEach(uniform =>{
                        writer.newLine().write(`${uniform.alias}: gl.getUniformLocation(program, "${uniform.name}"),`)
                    })
                    attribs.forEach(attrib =>{
                        writer.newLine().write(`${attrib.alias}: gl.getAttribLocation(program, "${attrib.name}"),`)
                    })
                })
            }
        });

        // Output  ts file
        file.contents = new Buffer(tsFile.write());
        callback(null, file);
    });
};

interface Variable {
    name: string;
    alias: string;
}

function getProgramName(file: File){
    let baseWithExt = file.relative;
    let baseLength = baseWithExt.length - ".glslx".length;
    let base = baseWithExt.substr(0, baseLength);
    return capitalize(base) + "Program";
}

function capitalize(str: string){
    return str[0].toUpperCase() + str.slice(1);
}
