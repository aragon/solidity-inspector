const BlockDeclaration = require('./BlockDeclaration');


class FunctionDeclaration extends BlockDeclaration {

  //returns can be only in functions
  getReturnsFromDeclaration() {
    if (!this.blockParsedData.modifiers) return {};
    let returns = this.blockParsedData.modifiers.find(elt => elt.name == 'returns');
    return returns && returns.params ? this.prepareReturns(returns.params) : {};
  }


  //in returns can be params without name (only type), its naming in structure param0, param1 ... etc
  prepareReturns(params) {
    let paramPos = 0;

    return params.reduce((params, param) => {
      params[param.hasOwnProperty('literal') ? param.id || param.name : 'param' + paramPos] = {
        type: param.hasOwnProperty('literal') ? param.literal.literal : param.name
      };
      paramPos++;
      return params;
    }, {});
  }


  //adding "returns" params
  getStructure() {

    let blockStructure = super.getStructure();

    let blockReturnsFromDeclaration = this.getReturnsFromDeclaration();

    //move returns to separate field
    if (Object.keys(blockReturnsFromDeclaration).length) {

      //returns can be setted in annonations
      blockStructure.returns =    blockStructure.returns  || {};

      blockStructure.returnsSeq = [];

      for (let returnParam in  blockReturnsFromDeclaration) {

        blockStructure.returnsSeq.push(returnParam);

        //annotation for returns in params exists
        if (blockStructure.params.hasOwnProperty(returnParam)) {
          blockStructure.returns[returnParam] = blockStructure.params[returnParam];
          delete blockStructure.params[returnParam];
        }
        else blockStructure.returns[returnParam] = blockStructure.returns[returnParam] || {};

        blockStructure.returns[returnParam] =
          Object.assign(blockStructure.returns[returnParam], blockReturnsFromDeclaration[returnParam]);

      }
    }

    return blockStructure;
  }


  isStruct(varType) {
    return this.options.structs[varType] != undefined;
  }

  getStruct(varType) {
    return this.options.structs[varType];
  }

  setReturnsFromStruct(blockStructure, varType) {

    let structStructure = this.getStruct(varType).toJSON ? this.getStruct(varType).toJSON() : this.getStruct(varType);
    blockStructure.returns = structStructure.params;
    blockStructure.returnsSeq = structStructure.paramsSeq;

    return blockStructure;
  }
}

module.exports = FunctionDeclaration;