const AnnonationParser = require('../AnnotationParser');

class BlockDeclaration {

  constructor(blockParsedData, annotationString, options = {}) {
    this.blockParsedData = blockParsedData;
    this.annotation = this.parseAnnotation(annotationString);
    this.options = options;
  }


  parseAnnotation(annotationString) {
    return AnnonationParser.parse(annotationString, this.parseAnnotationOptions());
  }


  parseAnnotationOptions() {
    return {
      typeHint: true,
      optional: false
    };
  }

  getParamsFromDeclaration() {
    return this.prepareParams(this.getParamsParsed());
  }


  getParamsParsed() {
    return this.blockParsedData.params ? this.blockParsedData.params : [];
  }

  getParamsSeq() {
    return this.getParamsParsed().reduce((paramsSeq, paramBlock) => paramsSeq.concat(paramBlock.id || paramBlock.name), []);
  }

  getName() {
    return this.blockParsedData.name;
  }

  prepareParams(params) {
    return params.reduce((params, param) => {
      params[param.id || param.name] = this.prepareParam(param);
      return params;
    }, {});
  }

  prepareParam(paramData) {
    return {
      type: paramData.literal.literal + (paramData.literal.array_parts[0] === null ? '[]' : '')
    };
  }

  toJSON() {
    return this.getStructure();
  }

  getStructure() {
    if (!this.blockParsedData) return {};

    // from annotation comes
    // {
    //    title : string
    //    description : string,
    //    params : {
    //      paramName : {
    //      description: string,
    //      typeHint: string | null,
    //      optional: bool,
    //      type : string  <-- added from params from block declaration
    //
    //    },
    // ...
    // }


    var blockStructure = Object.assign(
      {
        name: this.getName(),
        'paramsSeq': this.getParamsSeq()
      },
      this.annotation);
    var blockParamsFromDeclaration = this.getParamsFromDeclaration();


    if (!blockStructure.title) blockStructure.title = this.blockParsedData.name;

    //params from block annotation compared with params from block declaration
    for (var param in  blockParamsFromDeclaration) {


      //no annotation for param
      if (!blockStructure.params.hasOwnProperty(param)) blockStructure.params[param] = {};
      blockStructure.params[param].name = param;
      blockStructure.params[param] = Object.assign(blockStructure.params[param], blockParamsFromDeclaration[param]);
    }


    return blockStructure;
  }

}


module.exports = BlockDeclaration;
