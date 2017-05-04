import gulp = require("gulp");
import rename = require("gulp-rename");
import shadify = require("gulp-shadify");

gulp.task("build:examples", function(){
    // Search for files ending in .glslx
    return gulp.src("./examples/*.glslx")
        .pipe(shadify())
        .pipe(rename({extname: ".ts"}))
        .pipe(gulp.dest("./examples/"));
})



