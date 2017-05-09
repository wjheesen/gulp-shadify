export interface Uniforms {
    readonly [name: string]: WebGLUniformLocation;

    /**
     * The location of uniform mat4 u_projection.
     */
    u_projection: WebGLUniformLocation;
    /**
     * The location of uniform vec4 u_line.
     */
    u_line: WebGLUniformLocation;
    /**
     * The location of uniform float u_thickness.
     */
    u_thickness: WebGLUniformLocation;
    /**
     * The location of uniform vec4 u_color.
     */
    u_color: WebGLUniformLocation;
}

export interface Attributes {
    readonly [name: string]: number;

    /**
     * The location of attribute vec2 a_basisCoord.
     */
    a_basisCoord: number;
}

export type Variables = Uniforms|Attributes;

export const vertex = "uniform mat4 m;uniform vec4 c;uniform float p;attribute vec2 e;void main(){vec2 a=vec2(c.x,c.y),b=vec2(c.z,c.w);float d=distance(a,b),k=p,g=d*e.x,h=k*e.y,i=d,n=b.x-a.x,o=b.y-a.y,j=o/i,f=n/i,q=f*g-j*h,r=j*g+f*h,s=q+a.x,t=r+a.y;gl_Position=m*vec4(s,t,1.,1.);}";
export const fragment = "uniform vec4 l;void main(){gl_FragColor=l;}";
export const UniformRenaming = {"u_projection":"m","u_line":"c","u_thickness":"p","u_color":"l"};
export const AttributeRenaming = {"a_basisCoord":"e"};
