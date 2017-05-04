import {createProgramFromSources} from "gulp-shadify/program";

/**
 * Creates a new ShapeProgram.
 */
export function createShapeProgram(gl: WebGLRenderingContext) {
    let program = createProgramFromSources(gl, "uniform mat4 b;uniform mat3 a;attribute vec2 c;void main(){gl_Position.xy=c,gl_Position.z=1.,gl_Position.xyz=a*gl_Position.xyz,gl_Position.w=1.,gl_Position=b*gl_Position;}", "uniform vec4 d;void main(){gl_FragColor=d;}");
    return {
        location: program,
        u_model: gl.getUniformLocation(program, "a"),
        u_projection: gl.getUniformLocation(program, "b"),
        u_color: gl.getUniformLocation(program, "d"),
        a_position: gl.getAttribLocation(program, "c"),
    }
}
