const BlockDeclaration = require('./BlockDeclaration');


class StructDeclaration extends BlockDeclaration {

  //in struct params comed from parser in body
  getParamsParsed() {
    return this.blockParsedData.body? this.blockParsedData.body : [];
  }


}


module.exports = StructDeclaration;