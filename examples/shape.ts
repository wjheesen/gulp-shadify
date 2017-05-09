export interface Uniforms {
    readonly [name: string]: WebGLUniformLocation;

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
    readonly [name: string]: number;

    /**
     * The location of attribute vec2 a_position.
     */
    a_position: number;
}

export type Variables = Uniforms|Attributes;

export const vertex = "uniform mat4 b;uniform mat3 a;attribute vec2 c;void main(){vec3 e=a*vec3(c,1.);gl_Position=b*vec4(e,1.);}";
export const fragment = "uniform vec4 d;void main(){gl_FragColor=d;}";
export const UniformRenaming = {"u_projection":"b","u_model":"a","u_color":"d"};
export const AttributeRenaming = {"a_position":"c"};
