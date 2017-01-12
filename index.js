const fs = require("fs");
const path = require("path");
const ContractStructure = require("./lib/ContractStructure");

module.exports = {

    parse : function (source, options = {}) {

         //console.log (source);
         return new ContractStructure (source, options);

    },



    parseFile : function (file, options = {}) {
        options.filePath = path.resolve(file);
        return this.parse(fs.readFileSync(options.filePath, {encoding: "utf8"}), options);
    }
}