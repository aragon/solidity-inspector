const expect = require('chai').expect;
const SolidityStructure = require('../index');

describe('Contract with public var', function () {

  it('should have structure', function () {

    let structure = SolidityStructure.parseFile(__dirname + '/fixture/HasPublicVar.sol');

    expect(structure.toJSON().constantFunctions).to.deep.equal(
      {
        someCounter: {
          name: 'someCounter',
          description: '',

          params: {},
          paramsSeq: [],
          returns: {
            return0: {
              description: 'Some uint counter',
              type: 'uint'
            }
          },
          returnsSeq: [
            'return0'
          ],
          title: 'Some uint counter'
        }
      }
    );
  });


});
