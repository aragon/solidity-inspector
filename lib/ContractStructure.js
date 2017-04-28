'use strict';
const SolidityParser = require('solidity-parser');
const ContractSourceBlock = require('./ContractSourceBlock');

const defaultImportResolver = require('./importResolver');

class ContractStructure {


  constructor(source, options = {}) {
    this.source = source;
    this.options = Object.assign({}, this.constructor.getDefaultOptions(), options);
    this.cache = new Map();
    this.parentStructures = new Map();
  }

  static getDefaultOptions() {
    return {
      mergeWithParents: true,
      filePath: null,
      importResolver: defaultImportResolver,
      contractFileExtenstion: '.sol'
    };
  }

  getCached(key, callback) {
    if (this.cache.has(key)) return this.cache.get(key);
    this.cache.set(key, callback());
    return this.cache.get(key);
  }

  toJSON(mergeWithParents) {

    var structure = this.getStructure(mergeWithParents);

    for (let part of ['structs', 'functions', 'events', 'constantFunctions', 'enums'])
      for (let itemName in structure[part])
        structure[part][itemName] = structure[part][itemName]['toJSON'] ? structure[part][itemName].toJSON() : structure[part][itemName];

    return structure;

  }

  getStructure(mergeWithParents) {
    var structs = this.getStructs();

    var contractStructure = {
      contract: this.getContractInfo(),
      source: this.getSourceInfo(),
      parents: this.getParents(),
      structs: structs,
      enums: this.getEnums(),
      events: this.getEvents(),
      functions: this.getFunctions(structs),
      constantFunctions: this.getConstantFunctions(structs),
    };

    if (((mergeWithParents == undefined || mergeWithParents == null) && this.options.mergeWithParents) ||
      mergeWithParents) contractStructure = this.mergeWithParents(contractStructure);


    return contractStructure;
  }


  mergeWithParents(contractStructure) {

    //what merged
    var inheritedStructure = {
      structs: {},
      events: {},
      functions: {},
      constantFunctions: {},
      enums: {}
    };
    var inheritKeys = Object.keys(inheritedStructure);

    var parents = this.getParents();
    for (let parent in  parents) {
      var parentStructure = this.getParentStructure(parents[parent]).getStructure();
      for (let key of inheritKeys)  Object.assign(inheritedStructure[key], parentStructure[key]);
    }

    for (let key of inheritKeys) {
      contractStructure[key] = Object.assign(inheritedStructure[key], contractStructure[key]);
    }

    return contractStructure;
  }


  getParentStructure(contractPath) {
    if (!this.parentStructures.has(contractPath)) {
      var importResolved = this.options.importResolver(contractPath, this.options.filePath);
      this.parentStructures.set(contractPath, new ContractStructure(importResolved.source, { filePath: importResolved.path }));
    }

    return this.parentStructures.get(contractPath);
  }


  getPragma() {
    return this.getCached('pragma', () => {
      var pragmaStatement = this.getSourceStructure().body.find(elt => elt.type == 'PragmaStatement');
      return pragmaStatement && pragmaStatement.start_version ? pragmaStatement.start_version.operator + pragmaStatement.start_version.version : undefined;
    });
  }

  getImports() {
    return this.getCached('imports', () =>
      this.getSourceStructure().body.filter(elt => elt.type == 'ImportStatement')
        .map(elt => {
          var defaultAlias = this.getContractNameFromPath(elt.from);
          return {
            from: elt.from,
            alias: elt.alias || defaultAlias,
            defaultAlias: defaultAlias
          };
        }));
  }

  getContractNameFromPath(pathToContract) {
    return pathToContract.substr(pathToContract.lastIndexOf('/') + 1).replace(this.options.contractFileExtenstion, '');
  }

  getParents() {
    return this.getCached('parents', () => {
      var parents = {};
      for (var parentContract of this.getConractStatement().is.map(elt => elt.name)) {
        parents[parentContract] = this.resolveContractNameForImport(parentContract);
      }
      return parents;
    });
  }


  resolveContractNameForImport(parentContract) {
    //var imports = ;
    for (var importClause of this.getImports()) {
      if (importClause.alias == parentContract) return importClause.from;
    }
    return null;
  }

  /**
   *
   * @param blockData block fron parsed tree
   * @param blockType type of block  (Event, Function...)
   * @param options
   * @returns {BlockDeclaration}
   */
  createBlockObject(blockData, blockType, options = {}) {
    if (!blockData) return null;
    return ContractSourceBlock.create(blockData, this.findAnnotation(blockData.start), blockType, options);
  }


  /**
   *
   * @param blockDataArray array of block with parsed data
   * @param blockType
   * @param options
   * @returns {{BlockDeclaration}}
   */
  createBlockObjects(blockDataArray, blockType, options = {}) {
    var blockObjects = {};
    if (!blockDataArray || !Object.keys(blockDataArray).length) return {};

    for (var blockData of blockDataArray) {

      blockObjects[blockData.name] = this.createBlockObject(blockData, blockType, options);
    }
    return blockObjects;
  }


  getSourceStructure() {
    return this.getCached('sourceStructure', () => SolidityParser.parse(this.source));
  }

  getConractStatement() {
    return this.getCached('contractStatement', () => this.getSourceStructure().body.find(elt => elt.type == 'ContractStatement'));
  }


//Contract structure parts

  getContractAnnotation() {
    return this.getCached('contractAnnotation', () => {
      var annotation = this.createBlockObject(this.getConractStatement()).annotation;
      if (!annotation.title) annotation.title = this.getName();
      return annotation;
    });
  }

  getName() {
    return this.getConractStatement().name;
  }


  getContractInfo() {
    return Object.assign(
      {
        name: this.getName(),
        constructor: this.getConstructor() && this.getConstructor().toJSON()
      },
      this.getContractAnnotation()
    );

  }

  getSourceInfo() {
    return {
      pragma: this.getPragma(),
      imports: this.getImports(),
    };
  }


  getConstructor() {
    return this.getCached('constructorInfo', () => {
      var constructorBlock = this.getConractStatement().body ?
        this.getConractStatement().body.find(elt =>elt.type == 'FunctionDeclaration' && elt.name == this.getName()) : null;

      return this.createBlockObject(constructorBlock);
    });
  }


  getStructs() {

    return this.getCached('structs', () => this.createBlockObjects(
      this.getConractStatement().body ?
        this.getConractStatement().body.filter(elt => elt.type == 'StructDeclaration') : [],
      'StructDeclaration'));
  }

  getEvents() {
    return this.createBlockObjects(
      this.getConractStatement().body ?
        this.getConractStatement().body.filter(elt => elt.type == 'EventDeclaration') : [],
      'EventDeclaration');
  }


  getEnums() {
    return this.createBlockObjects(
      this.getConractStatement().body ?
        this.getConractStatement().body.filter(elt => elt.type == 'EnumDeclaration') : [],
      'EnumDeclaration');
  }

  getFunctions(structs) {

    return this.createBlockObjects(
      this.getConractStatement().body ?
        this.getConractStatement().body.filter(elt => elt.type == 'FunctionDeclaration' && elt.name != this.getName()
        && (!elt.modifiers || !elt.modifiers.find(subElt => subElt.name == 'constant' || subElt.name == 'internal'))) : {},
      'FunctionDeclaration', { structs: structs });

  }


  getConstantFunctions(structs) {
    return this.getConractStatement().body ? Object.assign({},

      //search for public variables
      this.createBlockObjects(this.getConractStatement().body.filter(
        elt => elt[0] != undefined && elt[0].type == 'DeclarativeExpression' && elt[0].is_public == true).map(elt => elt[0]),
        'PublicVariableDeclaration', { structs: structs }),


      //search for public variable with assignment expression
      this.createBlockObjects(  this.getConractStatement().body.filter(
        elt => elt[0] != undefined && elt[0].type == 'AssignmentExpression' &&
        elt[0].left.type == 'DeclarativeExpression' && elt[0].left.is_public  == true ).map(elt => elt[0].left),
        'PublicVariableDeclaration', { structs: structs }),


      //search for function declaration with "constant" modifier and not "internal" modifier
      this.createBlockObjects(this.getConractStatement().body.filter(
        elt => elt.type == 'FunctionDeclaration' && elt.name != this.getName() && elt.modifiers &&
        elt.modifiers.find(subElt => subElt.name == 'constant') && !elt.modifiers.find(subElt => subElt.name == 'internal')),
        'FunctionDeclaration', { structs: structs })
    ) : {};
  }


//Work with annotations

  findAnnotation(annotationEndPos) {

    var sourceLines = this.source.substring(0, annotationEndPos).split(/\r?\n/);

    var str = sourceLines.pop().trim();
    var annonations = [];
    while (!str || str.substring(0, 2) == '*/' || str.substring(0, 1) == '*' || str.substring(0, 3) == '/**') {

      var lineStr = str.replace(/\/?\*\/?/g, '').trim();
      if (lineStr) annonations.push(lineStr);

      if (!sourceLines.length) break;

      str = sourceLines.pop().trim();
    }
    return annonations.reverse().map(str => str.trim()).join('\n');
  }
}


module.exports = ContractStructure;
