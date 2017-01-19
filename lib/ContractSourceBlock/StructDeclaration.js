const BlockDeclaration = require('./BlockDeclaration');


class StructDeclaration extends BlockDeclaration {


  //in struct params comed from parser in body
  getParamsFromDeclaration() {
    return this.blockParsedData.body ? this.prepareParams(this.blockParsedData.body) : {};
  }

}


module.exports = StructDeclaration;