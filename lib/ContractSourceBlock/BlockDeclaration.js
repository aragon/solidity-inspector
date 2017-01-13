const AnnonationParser = require('../AnnotationParser');

class BlockDeclaration {

    constructor(blockParsedData, annotationString) {
        this.blockParsedData = blockParsedData;
        this.annotation = AnnonationParser.parse(annotationString);
    }


    getParamsFromDeclaration() {
        return this.blockParsedData.params ? this.prepareParams(this.blockParsedData.params) : {};
    }


    prepareParams(params) {
        return params.reduce((params, param) => {
            params[param.id || param.name] = this.prepareParam(param);
            return params;
        }, {});
    }

    prepareParam(paramData) {
        return {
            type: paramData.literal.literal
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


        var blockStructure = Object.assign({}, this.annotation);
        var blockParamsFromDeclaration = this.getParamsFromDeclaration();

        if (!blockStructure.title) blockStructure.title =  this.blockParsedData.name;

        //params from block annotation compared with params from block declaration
        for (var param in  blockParamsFromDeclaration) {
            //no annotation for param
            if (!blockStructure.params.hasOwnProperty(param)) blockStructure.params[param] = {};
            blockStructure.params[param] = Object.assign(blockStructure.params[param], blockParamsFromDeclaration[param]);
        }

        return blockStructure;
    }

}


module.exports = BlockDeclaration;