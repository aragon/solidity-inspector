const BlockDeclaration = require('./BlockDeclaration');


class FunctionDeclaration extends BlockDeclaration {

    //returns can be only in functions
    getReturnsFromDeclaration() {
        if (!this.blockParsedData.modifiers) return {};
        var returns = this.blockParsedData.modifiers.find(elt => elt.name == 'returns');
        return returns && returns.params ? this.prepareReturns(returns.params) : {};
    }

    //in returns can be params without name (only type), its naming in structure param0, param1 ... etc
    prepareReturns(params) {
        var paramPos = 0;

        return params.reduce((params, param) => {
            params[ param.hasOwnProperty('literal') ? param.id  || param.name : 'param'+paramPos] = {
                type: param.hasOwnProperty('literal') ? param.literal.literal : param.name
            };
            paramPos++;
            return params;
        }, {});
    }


    //adding "returns" params
    getStructure() {
        var blockStructure = super.getStructure();

        var blockReturnsFromDeclaration = this.getReturnsFromDeclaration();

        //move returns to separate field
        if (Object.keys(blockReturnsFromDeclaration).length) {
            blockStructure.returns = {};
            for (var returnParam in  blockReturnsFromDeclaration) {

                //annotation for return param exists
                if (blockStructure.params.hasOwnProperty(returnParam)) {
                    blockStructure.returns[returnParam] = blockStructure.params[returnParam];
                    delete blockStructure.params[returnParam];
                }
                else blockStructure.returns[returnParam] = {};

                blockStructure.returns[returnParam] =
                    Object.assign(blockStructure.returns[returnParam], blockReturnsFromDeclaration[returnParam]);

            }
        }

        return blockStructure;
    }
}

module.exports = FunctionDeclaration;