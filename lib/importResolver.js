const fs = require("fs");
const path = require("path");

module.exports = function importResolver(importPath, basePath) {

    var resolvedPath = path.resolve(basePath ? path.dirname(basePath) : process.cwd(), importPath);

    if (!fs.existsSync(resolvedPath))
        throw new Error('Can\'t resolve import path "' + importPath + '"' + (basePath ? ' from base path "' + basePath + '"' : ''));

    return {
        path: resolvedPath,
        source: fs.readFileSync(resolvedPath, {encoding: "utf8"})
    }
};