const fs = require('fs');
const path = require('path');
const ContractStructure = require('./lib/ContractStructure');

module.exports = {
  parse: function (source, options = {}) {
    return new ContractStructure(source, options);
  },

  parseFile: function (file, options = {}) {

    if (!file) throw new Error('SolidityStructure.parseFile : File path not provided');
    options.filePath = path.resolve(file);

    if (!fs.existsSync(options.filePath))
      throw new Error('SolidityStructure: file "' + options.filePath + '" not exists');

    return this.parse(fs.readFileSync(options.filePath, { encoding: 'utf8' }), options);
  }
};