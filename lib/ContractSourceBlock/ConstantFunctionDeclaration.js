const FunctionDeclaration = require('./FunctionDeclaration');

class ConstantFunctionDeclaration extends FunctionDeclaration {

    getStructure() {
        var blockStructure = super.getStructure();

        //block - is public variable
        if (this.blockParsedData.type == 'DeclarativeExpression') {

            var param = this.blockParsedData.name;
            blockStructure.returns = {
                [param]: {
                    type : this.blockParsedData.literal.literal
                }
            };

            //for public var also exists @param in annotation
            if (blockStructure.params[param] != undefined) {
                Object.assign (blockStructure.returns[param],blockStructure.params[param]);
                delete blockStructure.params[param];
            }

            //set title from annonation
            if (!blockStructure.returns[param].description)
                blockStructure.returns[param].description =  blockStructure.title;
        }

        return blockStructure;
    }
}

module.exports = ConstantFunctionDeclaration;