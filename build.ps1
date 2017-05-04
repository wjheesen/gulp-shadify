# Copy glslx declaration to node_modules folder
copy-item src/glslx.d.ts ./node_modules/glslx/index.d.ts
# Clean lib folder and self reference folder
Remove-Item ./lib, ./node_modules/gulp-shadify -Recurse -ErrorAction Ignore
# Transpile src files (with "outDir" set to lib folder)
tsc --project ./src/tsconfig.json
# Copy package files to lib folder
Copy-Item -Path package.json, README.md, LICENSE -Destination ./lib
# Copy lib folder to node_modules (for self reference)
Copy-Item -Path ./lib -Destination ./node_modules/gulp-shadify -Recurse