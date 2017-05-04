/**
 * Creates a program from 2 shaders.
 * @param  gl the WebGL context.
 * @param  vertexShaderSource string containing code for the vertex shader.
 * @param  fragmentShaderSource string containing code for the fragment shader.
 * @returns the program.
 */
export function createProgramFromSources(gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string) {
    // Compile vertex and fragment shader
    let vs = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    let fs = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
    // Create program and return
    return createProgramFromShaders(gl, vs, fs);
};

/**
 * Creates a program from 2 shaders.
 * @param  gl rhe WebGL context.
 * @param  vertexShader a compiled vertex shader.
 * @param  fragmentShader a compiled fragment shader.
 * @returns the program.
 */
export function createProgramFromShaders(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    // create a program.
    var program = gl.createProgram();

    // attach the shaders.
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // link the program.
    gl.linkProgram(program);

    // Check if it linked.
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        // something went wrong with the link
        throw ("program filed to link:" + gl.getProgramInfoLog(program));
    }

    return program;
};

/**
 * Creates and compiles a shader.
 * @param gl the WebGL Context.
 * @param shaderSource the GLSL source code for the shader.
 * @param shaderType the type of shader, VERTEX_SHADER or FRAGMENT_SHADER.
 * @returns the shader.
 */
export function compileShader(gl: WebGLRenderingContext, shaderSource: string, shaderType: number) {
    // Create the shader object
    var shader = gl.createShader(shaderType);

    // Set the shader source code.
    gl.shaderSource(shader, shaderSource);

    // Compile the shader
    gl.compileShader(shader);

    // Check if it compiled
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
        // Something went wrong during compilation; get the error
        throw "could not compile shader:" + gl.getShaderInfoLog(shader);
    }

    return shader;
}









