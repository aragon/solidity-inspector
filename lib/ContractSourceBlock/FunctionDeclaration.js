const BlockDeclaration = require('./BlockDeclaration');

let accessModifiers = ['public', 'internal', 'external', 'private']
let defaultAccessModifier = 'public'

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

  getName() {
      const params = this.getParamsFromDeclaration()
      const ordered = Object.keys(params).map(x => params[x].type)
        .map(x => x == 'uint' ? 'uint256' : x) // replace unspecified uint types
        .map(x => x.toLowerCase() != x ? 'address' : x) // replace contract types for address
      const name = super.getName()
      return name ? super.getName() + `(${ordered.join(',')})` : 'fallback'
  }

  getAccessModifier() {
    if (!this.blockParsedData.modifiers) return defaultAccessModifier
    let modifier = this.blockParsedData.modifiers.find(elt => accessModifiers.indexOf(elt.name) > -1)

    return modifier ? modifier.name : defaultAccessModifier
  }

  getOtherModifiers() {
    const modifierBlacklist = accessModifiers.concat(['constant'])
    if (!this.blockParsedData.modifiers) return []

    return this.blockParsedData.modifiers
              .filter(elt => modifierBlacklist.indexOf(elt.name) == -1 && elt.name != 'returns')
              .map(elt => ({ name: elt.name, params: elt.params.map(x => x.name) }))
  }

  //adding "returns" params
  getStructure() {
    let blockStructure = super.getStructure();
    let blockReturnsFromDeclaration = this.getReturnsFromDeclaration();

    blockStructure.accessModifier = this.getAccessModifier()
    blockStructure.modifiers = this.getOtherModifiers()

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
