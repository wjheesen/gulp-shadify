export interface Uniforms {
    /**
     * The location of uniform mat4 u_projection.
     */
    u_projection: WebGLUniformLocation;
    /**
     * The location of uniform mat3 u_model.
     */
    u_model: WebGLUniformLocation;
    /**
     * The location of uniform vec4 u_color.
     */
    u_color: WebGLUniformLocation;
}

export interface Attributes {
    /**
     * The location of attribute vec2 a_position.
     */
    a_position: number;
}

export let vertexShader = "uniform mat4 b;uniform mat3 a;attribute vec2 c;void main(){vec3 e=a*vec3(c,1.);gl_Position=b*vec4(e,1.);}";
export let fragmentShader = "uniform vec4 d;void main(){gl_FragColor=d;}";
export let uniformRenaming = {"u_projection":"b","u_model":"a","u_color":"d"};
export let attributeRenaming = {"a_position":"c"};
