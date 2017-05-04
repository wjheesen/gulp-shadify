import {createProgramFromSources} from "gulp-shadify/program";

/**
 * Creates a new EllipseProgram.
 */
export function createEllipseProgram(gl: WebGLRenderingContext) {
    let program = createProgramFromSources(gl, "uniform mat4 i;uniform vec4 c;attribute vec2 e;varying vec2 d;void main(){float a=c.x,f=c.y,h=c.z,b=c.w,j=h-a,k=f-b,l=j*e.x+a,m=k*e.y+b;gl_Position=i*vec4(l,m,1.,1.),d=e*2.-1.;}", "uniform vec4 g;varying vec2 d;void main(){float a=dot(d,d),b=float(a<=1.);gl_FragColor=g*b;}");
    return {
        location: program,
        u_bounds: gl.getUniformLocation(program, "c"),
        u_color: gl.getUniformLocation(program, "g"),
        u_projection: gl.getUniformLocation(program, "i"),
        a_basisCoord: gl.getAttribLocation(program, "e"),
    }
}
