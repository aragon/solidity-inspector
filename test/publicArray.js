const expect = require('chai').expect;
const SolidityStructure = require('../index');

describe('Test contract with public array', function () {

  it('structure', function () {

    var structure = SolidityStructure.parseFile(__dirname + '/fixture/HasPublicArray.sol');


    //test when using JSON.stringify vs .toJSON method
    expect(JSON.parse (JSON.stringify(structure)).constantFunctions).to.deep.equal(
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
            return0: {
              description: '',
              type: 'string'
            }
          },

          returnsSeq: ['return0']

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
            someString: {
              name: 'someString',
              description: 'Description of string param',
              type: 'string',
              typeHint: null
            },
            someUint: {
              name: 'someUint',
              description: '',
              type: 'uint',
              typeHint: null,
            },
            someAddress: {
              name: 'someAddress',
              type: 'address'
            }
          },
          returnsSeq: [
            'someString',
            'someUint',
            'someAddress'
          ]


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
            someString: {
              name: 'someString',
              description: 'Description of string param',
              type: 'string',
              typeHint: null
            },
            someUint: {
              name: 'someUint',
              description: '',
              type: 'uint',
              typeHint: null,
            },
            someAddress: {
              name: 'someAddress',
              type: 'address'
            }
          },
          returnsSeq: [
            'someString',
            'someUint',
            'someAddress'
          ]
        }

      }
    );
  });


});
