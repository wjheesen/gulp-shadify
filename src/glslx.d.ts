// Type definitions for GLSLX
// Project: gulp-shadify
// Definitions by: William Heesen <https://wjheesen.github.io/>

export as namespace GLSLX;

export function compile(glslx: string, options: Options): Result;

export interface Options {
    disableRewriting: boolean;
    format: "json" | "c++" | "skew";
    prettyPrint: boolean;
    keepSymbols: boolean;
    renaming: "all" | "internal-only" | "none";
}

export interface Result {
    log: string;
    output: string;
}

export interface Program {
    shaders: Shader[];
    renaming: StringMap;
}

export interface Shader {
    name: string;
    contents: string;
}

interface StringMap {
    [key: string]: string;
}