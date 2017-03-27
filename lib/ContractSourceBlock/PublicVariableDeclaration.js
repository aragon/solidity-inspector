const FunctionDeclaration = require('./FunctionDeclaration');

class PublicVariableDeclaration extends FunctionDeclaration {


  isArrayVariable() {
    return this.blockParsedData.literal.array_parts.length > 0;
  }

  getStructure() {

    const ARRAY_INDEX = 'index';

    let  blockStructure = super.getStructure();

    if (this.isArrayVariable()) {

      blockStructure.params = {
        [ARRAY_INDEX]: {
          name: ARRAY_INDEX,
          description: '',
          type: 'uint',
          typeHint: null
        }
      };

      blockStructure.paramsSeq = [ARRAY_INDEX];
    }
    else {

    }


    let param = this.blockParsedData.name;
    let varType = this.blockParsedData.literal.literal;

    if (this.isStruct(varType)) {
      blockStructure = this.setReturnsFromStruct (blockStructure, varType);
    }
    else {

      let returnParamName = 'return0';
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