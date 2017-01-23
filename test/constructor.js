const expect = require('chai').expect;
const SolidityStructure = require('../index');

describe('Test contract with constructor', function () {

  it('Constructor with partially described params', function () {

    var structure = SolidityStructure.parseFile(__dirname + '/fixture/WithConstructor.sol');

    expect(structure.toJSON().contract.constructor).to.deep.equal(
      {
        name: 'WithConstructor',
        title: 'my constructor short description',
        description: 'My constructor long long description',
        paramsSeq: [
          'uintParam',
          'stringParam',
          'uintParam2'
        ],
        params: {
          uintParam: {
            name : 'uintParam',
            description: 'Description of item 1',
            type: 'uint',
            typeHint: null
          },
          stringParam: {
            name: 'stringParam',
            type: 'string'
          },
          uintParam2: {
            name : 'uintParam2',
            description: '',
            type: 'uint',
            typeHint: null
          },
        }
      }
    )
    ;
  });


});
