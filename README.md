# gulp-shadify
Generates typed WebGL programs from a .glslx file.

[![NPM](https://nodei.co/npm/gulp-shadify.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gulp-shadify/)

## Install
`npm install gulp-shadify --save-dev`

## Create a .glslx file
The first function must be the vertex shader, and the second function must be the fragment shader.

For example: `./examples/shape.glslx`

```glsl
uniform mat4 u_projection; // Projection matrix (maps from world space to clip space)
uniform mat3 u_model;      // Model matrix (maps from model space to world space)
uniform vec4 u_color;      // Color of shape
attribute vec2 a_position; // Position of current vertex in model space

export void vertex(){
      gl_Position.xy = a_position;                  // Model space
      gl_Position.z = 1.0;
      gl_Position.xyz = u_model * gl_Position.xyz;  // World space
      gl_Position.w = 1.0;
      gl_Position = u_projection * gl_Position;     // Clip space
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

