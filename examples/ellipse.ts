export interface Uniforms {
    /**
     * The location of uniform mat4 u_projection.
     */
    u_projection: WebGLUniformLocation;
    /**
     * The location of uniform vec4 u_bounds.
     */
    u_bounds: WebGLUniformLocation;
    /**
     * The location of uniform vec4 u_color.
     */
    u_color: WebGLUniformLocation;
}

export interface Attributes {
    /**
     * The location of attribute vec2 a_basisCoord.
     */
    a_basisCoord: number;
}

export let vertexShader = "uniform mat4 i;uniform vec4 c;attribute vec2 e;varying vec2 d;void main(){float a=c.x,f=c.y,h=c.z,b=c.w,j=h-a,k=f-b,l=j*e.x+a,m=k*e.y+b;gl_Position=i*vec4(l,m,1.,1.),d=e*2.-1.;}";
export let fragmentShader = "uniform vec4 g;varying vec2 d;void main(){float a=dot(d,d),b=float(a<=1.);gl_FragColor=g*b;}";
export let uniformRenaming = {"u_projection":"i","u_bounds":"c","u_color":"g"};
export let attributeRenaming = {"a_basisCoord":"e"};
