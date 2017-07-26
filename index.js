const fs = require('fs');
const path = require('path');
const ContractStructure = require('./lib/ContractStructure');


const structureCache = new Map();


module.exports = {
  parse: function (source, options = {}) {
    return new ContractStructure(source, options);
  },

  parseFile: function (file, options = {}) {
    if (!file) throw new Error('SolidityStructure.parseFile : File path not provided');
    options.filePath = path.resolve(file);

    if (!fs.existsSync(options.filePath))
      throw new Error('SolidityStructure: file "' + options.filePath + '" not exists');

    options.file = file

    return this.parse(fs.readFileSync(options.filePath, { encoding: 'utf8' }), options);
  },


  parseFileToJson: function (file, { useCache = false }  = {}) {
    file = path.resolve(file);
    if (useCache) {
      if (!structureCache.has(file)) structureCache.set (file,module.exports.parseFile(file).toJSON());
      return structureCache.get(file);
    }

    return module.exports.parseFile(file);
  }
};
