const FunctionDeclaration = require('./FunctionDeclaration');

class PublicVariableDeclaration extends FunctionDeclaration {


  isArrayVariable() {
    return this.blockParsedData.literal.array_parts.length > 0;
  }

  getStructure() {
    var blockStructure = super.getStructure();

    if (this.isArrayVariable()) {

      blockStructure.params = {
        'arrayIndex': {
          name: 'arrayIndex',
          description: '',
          type: 'uint',
          typeHint: null
        }
      };

      blockStructure.paramsSeq = ['arrayIndex'];
    }
    else {

    }


    var param = this.blockParsedData.name;
    var varType = this.blockParsedData.literal.literal;

    if (this.isStruct(varType)) {
      this.setReturnsFromStruct (blockStructure, varType);
    }
    else {

      var returnParamName = 'return0';
      blockStructure.returns = {
        [returnParamName]: {
          type: varType
        }
      };

      blockStructure.returnsSeq = ['return0'];

      //for public var also exists @param in annotation
      if (blockStructure.params[param] != undefined) {
        Object.assign(blockStructure.returns[returnParamName], blockStructure.params[param]);
        delete blockStructure.params[param];
      }

      //set title from annonation
      if (!this.isArrayVariable() && !blockStructure.returns[returnParamName].description)
        blockStructure.returns[returnParamName].description = blockStructure.title;
      else blockStructure.returns[returnParamName].description = '';

    }

    return blockStructure;
  }
}

module.exports = PublicVariableDeclaration;