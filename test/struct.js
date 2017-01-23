const expect = require('chai').expect;
const SolidityStructure = require('../index');

describe('Test contract with struct', function () {

  it('Struct', function () {

    var structure = SolidityStructure.parseFile(__dirname + '/fixture/HasStruct.sol');

    expect(structure.toJSON().structs).to.deep.equal(
      {
        MyStruct: {
          name: 'MyStruct',
          title: 'my structure short description',
          description: 'My structure lon long description',
          paramsSeq: ['someString', 'someUint', 'someAddress'],
          params: {
            someString: {
              name : 'someString',
              description: 'Description of string param',
              type: 'string',
              typeHint: null
            },
            someUint: {
              name : 'someUint',
              description: '',
              type: 'uint',
              typeHint: null,
            },
            someAddress: {
              name : 'someAddress',
              type: 'address'
            },
          }

        }
      }
    );
  });


});
