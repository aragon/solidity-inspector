const AnnonationParser = require('./AnnotationParser');

class ContractSourceBlock {

    constructor(blockData, annotationString) {
        this.blockData = blockData;
        this.annotationString = annotationString;
        this.annotation = null;

        //console.log (blockData);
    }


    getAnnotation() {
        return this.annotation = this.annotation || this.parseAnnotation(this.annotationString);
    }

    parseAnnotation(annotationString) {
        return AnnonationParser.parse(annotationString);
    }


    getParamsFromDeclaration() {
       return  this.blockData.params ? this.blockData.params.reduce((params, param) => {
            params[param.id] =  this.prepareParam (param);
            return params;
        }, {}) : [];
    }


    getParams() {


    }

    prepareParam (paramData)
    {
        var param =
        {
            type: paramData.literal.literal
        };

        if (this.blockData.type == 'EventDeclaration') param.isIndexed =  paramData.is_indexed;
        return param;
    }

    toJSON() {
        if (!this.blockData) return {};


        //if (blockInfo.type == 'FunctionDeclaration')
        //log.debug (blockInfo);


        var blockData = Object.assign({}, this.getAnnotation());
        var blockParams = this.getParamsFromDeclaration();


        //params from block declarration compared with params fron annotation
        for (var param in  blockParams) {
            if (blockData.params[param] == undefined) blockData.params[param] = {};
            blockData.params[param] = Object.assign(blockData.params[param], blockParams[param]);
        }

        //console.log (blockData);
        return blockData;
    }

}


module.exports = ContractSourceBlock;