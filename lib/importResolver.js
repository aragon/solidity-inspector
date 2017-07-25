const fs = require('fs');
const path = require('path');

module.exports = function importResolver(importPath, basePath) {
  const pathChars = ['.', '/']
  const isDependencyImport = importPath && pathChars.indexOf(importPath[0]) == -1

  if (isDependencyImport) {
    const pathComponents = importPath.split('/')
    const moduleName = pathComponents[0]

    importPath = path.join('installed_contracts', moduleName, 'contracts', pathComponents.slice(1).join('/'))
  }

  var resolvedPath = path.resolve(basePath && !isDependencyImport ? path.dirname(basePath) : process.cwd(), importPath);

  if (!fs.existsSync(resolvedPath))
    throw new Error('Can\'t resolve import path "' + importPath + '"' + (basePath ? ' from base path "' + basePath + '"' : ''));

  return {
    path: resolvedPath,
    source: fs.readFileSync(resolvedPath, { encoding: 'utf8' })
  };
};
