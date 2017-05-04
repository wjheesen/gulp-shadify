import {createProgramFromSources} from "gulp-shadify/program";

/**
 * Creates a new LineProgram.
 */
export function createLineProgram(gl: WebGLRenderingContext) {
    let program = createProgramFromSources(gl, "uniform mat4 m;uniform vec4 c;uniform float p;attribute vec2 e;void main(){vec2 a=vec2(c.x,c.y),b=vec2(c.z,c.w);float d=distance(a,b),k=p,g=d*e.x,h=k*e.y,i=d,n=b.x-a.x,o=b.y-a.y,j=o/i,f=n/i,q=f*g-j*h,r=j*g+f*h,s=q+a.x,t=r+a.y;gl_Position=m*vec4(s,t,1.,1.);}", "uniform vec4 l;void main(){gl_FragColor=l;}");
    return {
        location: program,
        u_line: gl.getUniformLocation(program, "c"),
        u_color: gl.getUniformLocation(program, "l"),
        u_projection: gl.getUniformLocation(program, "m"),
        u_thickness: gl.getUniformLocation(program, "p"),
        a_basisCoord: gl.getAttribLocation(program, "e"),
    }
}
