const expect = require('chai').expect;
const SolidityStructure = require('../index');

describe('Test contract with struct', function () {

  it('Struct', function () {

    var structure = SolidityStructure.parseFile(__dirname + '/fixture/HasStruct.sol');

    expect(structure.toJSON().structs).to.deep.equal(
      {
        MyStruct: {
          title: 'my structure short description',
          description: 'My structure lon long description',
          params: {
            someString: {
              description: 'Description of string param',
              optional: false,
              type: 'string',
              typeHint: null
            },
            someUint: {
              description: '',
              optional: false,
              type: 'uint',
              typeHint: null,
            },
            someAddress: {
              type: 'address'
            },
          }

        }
      }
    );
  });


});
