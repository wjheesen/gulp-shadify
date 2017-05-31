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
        let shaders = program.shaders;
        let renaming = program.renaming;

        // Parse uniforms and attribs
        let uniforms = <Variable[]> [];
        let attribs = <Variable[]> [];
        let uniformRenaming = <StringMap> {};
        let attribRenaming = <StringMap> {};        
        let regex = /(uniform|attribute) (.+?) (.+?);/g;
        
        shaders.forEach(shader => {
            let match = <RegExpExecArray> null;
            while(match = regex.exec(shader.contents)){
                // TODO: capture attribute vec2 c,d;
                let declarationType = match[1];         // "uniform" or "attribute"
                let type = match[2];                    // Vec2, Sampler2D, etc..
                let names = match[3].split(",");        // Declaration may contain multiple variables separated by commas
                names.forEach(name => {   
                    for(let property in renaming){
                        if(renaming[property] === name){
                            let variable = { name: name, alias: property, type: type }
                            if(declarationType === "uniform"){
                                uniforms.push(variable);
                                uniformRenaming[property] = name;
                            } else {
                                attribs.push(variable);
                                attribRenaming[property] = name;
                            }
                        }
                    }    
                })            
            }
        });

        // Create ts file
        let tsFile = tsTypeInfo.createFile();

        tsFile.addInterface({
            name: "Uniforms",
            isExported: true,
            indexSignatures: [{isReadonly: true, keyName: "name", keyType: "string", returnType: "WebGLUniformLocation"}],
            properties: uniforms.map(uniform => {
                return {
                    name: uniform.alias, 
                    type: "WebGLUniformLocation",
                    documentationComment: `The location of uniform ${uniform.type} ${uniform.alias}.`
                }
            })
        });

        tsFile.addInterface({
            name: "Attributes",
            isExported: true,
            indexSignatures: [{isReadonly: true, keyName: "name", keyType: "string", returnType: "number"}],
            properties: attribs.map(attrib => {
                return {
                    name: attrib.alias, 
                    type: "number",
                    documentationComment: `The location of attribute ${attrib.type} ${attrib.alias}.`
                }
            })
        })

        tsFile.addTypeAlias({
            isExported: true,
            name: "Variables",
            type: "Uniforms|Attributes"
        })

        shaders.forEach(shader => {
            tsFile.addVariable({
                isExported: true, 
                declarationType: "const",
                name: shader.name, 
                defaultExpression: JSON.stringify(shader.contents),
            })
        })

        tsFile.addVariable({
            isExported: true, 
            declarationType: "const",
            name: "UniformRenaming",
            defaultExpression: JSON.stringify(uniformRenaming)
        })

        tsFile.addVariable({
            isExported: true, 
            declarationType: "const",
            name: "AttributeRenaming",
            defaultExpression: JSON.stringify(attribRenaming)
        })

        // Output ts file
        file.contents = new Buffer(tsFile.write());
        callback(null, file);
    });
};

interface Variable {
    name: string;
    alias: string;
    type: string;
}

interface StringMap {
    [key: string]: string;
}

