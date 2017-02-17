const expect = require('chai').expect;
const SolidityStructure = require('../index');

describe('Test contract with public array', function () {

  it('structure', function () {

    var structure = SolidityStructure.parseFile(__dirname + '/fixture/HasPublicArray.sol');


    expect(structure.toJSON().constantFunctions).to.deep.equal(
      {


        someStrings: {
          name: 'someStrings',
          title: 'Array of strings is here',
          description: '',
          params: {
            arrayIndex: {
              name: 'arrayIndex',
              description: '',
              type: 'uint',
              typeHint: null
            }
          },
          paramsSeq: ['arrayIndex'],

          returns: {
            string: {
              description: '',
              type: 'string'
            }
          }

        },

        someStructs: {
          description: '',
          name: 'someStructs',
          title: 'Array of structs is here',
          params: {
            arrayIndex: {
              name: 'arrayIndex',
              description: '',
              type: 'uint',
              typeHint: null
            }
          },
          paramsSeq: ['arrayIndex'],
          returns: {
            MyStruct: {
              description: '',
              type: 'MyStruct'
            }
          }

        },

        someAnotherStructs: {
          description: '',
          name: 'someAnotherStructs',
          title: 'someAnotherStructs',
          params: {
            arrayIndex: {
              name: 'arrayIndex',
              description: '',
              type: 'uint',
              typeHint: null
            }
          },
          paramsSeq: [
            'arrayIndex'
          ],
          returns: {
            MyStruct: {
              'description': '',
              'type': 'MyStruct'
            }
          }

        }


      }
    );
  });


});
