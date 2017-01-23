const blockTypes = {
  BlockDeclaration: require('./BlockDeclaration'),
  StructDeclaration: require('./StructDeclaration'),
  FunctionDeclaration: require('./FunctionDeclaration'),
  ConstantFunctionDeclaration: require('./ConstantFunctionDeclaration'),
  EventDeclaration: require('./EventDeclaration'),
  EnumDeclaration: require('./EnumDeclaration')
};

module.exports = {

  create: function (blockData, annotationString, blockType) {

    blockType = blockType || 'BlockDeclaration';

    if (blockTypes[blockType] == undefined)
      throw new Error('ContractSourceBlock with type "' + blockType + '" is not defined');
    return new blockTypes[blockType](blockData, annotationString);
  }
};