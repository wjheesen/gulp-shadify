# gulp-shadify
Generates typed WebGL programs from a .glslx file.

[![NPM](https://nodei.co/npm/gulp-shadify.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gulp-shadify/)

## Install
`npm install gulp-shadify --save-dev`

## Create a .glslx file
For example: `./examples/shape.glslx`

```glsl
uniform mat4 u_projection; // Projection matrix (maps from world space to clip space)
uniform mat3 u_model;      // Model matrix (maps from model space to world space)
uniform vec4 u_color;      // Color of shape
attribute vec2 a_position; // Position of current vertex in model space

export void vertex(){
    vec3 worldPosition = u_model * vec3(a_position, 1.0);
    gl_Position = u_projection * vec4(worldPosition, 1.0);
}

export void fragment(){
    gl_FragColor = u_color;
}
```
See http://evanw.github.io/glslx/ for information on GLSLX.

## Create a gulp task
```javascript
var gulp = require("gulp");
var rename = require("gulp-rename");
var shadify = require("gulp-shadify");

gulp.task("build:examples", function () {
    // Search for files ending in .glslx
    return gulp.src("./examples/*.glslx")
        .pipe(shadify())
        .pipe(rename({ extname: ".ts" }))
        .pipe(gulp.dest("./examples/"));
});
```

## Run gulp task
`gulp shadify`

Output: `./examples/shape.ts`

```TypeScript
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
```

## Examples
GLSLX | Output
----- | ------
[shape.glslx][1] | [shape.ts][2]
[ellipse.glslx][3] | [ellipse.ts][4]
[line.glslx][5] | [line.ts][6]

[1]: https://github.com/wjheesen/gulp-shadify/blob/master/examples/shape.glslx "Shape GLSLX"
[2]: https://github.com/wjheesen/gulp-shadify/blob/master/examples/shape.ts "Shape Output"
[3]: https://github.com/wjheesen/gulp-shadify/blob/master/examples/ellipse.glslx "Ellipse GLSLX"
[4]: https://github.com/wjheesen/gulp-shadify/blob/master/examples/ellipse.ts "Ellipse Output"
[5]: https://github.com/wjheesen/gulp-shadify/blob/master/examples/line.glslx "Line GLSLX"
[6]: https://github.com/wjheesen/gulp-shadify/blob/master/examples/line.ts "Line Output"