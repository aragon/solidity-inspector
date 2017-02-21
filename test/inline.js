const expect = require('chai').expect;
const SolidityStructure = require('../index');

describe('Test contract without annotations and imports', function () {


  it('Simpe inline contract', function () {

    var structure = SolidityStructure.parse(`
contract test { 
  function multiply(uint a) returns(uint d) { 
    return a * 7; 
    } 
}`).toJSON();
    //console.log(JSON.stringify(structure, null, 2));
    expect(structure).to.deep.equal(
      {
        contract: {
          name: 'test',
          constructor: null,
          title: 'test',
          description: '',
          params: {}
        },
        source: {
          imports: [],
          pragma: undefined
        },
        parents: {},
        structs: {},
        events: {},
        enums: {},
        functions: {
          multiply: {
            name: 'multiply',
            title: 'multiply',
            description: '',
            paramsSeq: ['a'],
            params: {
              a: {
                name: 'a',
                type: 'uint'
              }
            },
            returns: {
              d: {
                type: 'uint'
              }
            },
            returnsSeq: [
              'd'
            ]

          }
        },
        constantFunctions: {}
      }
    );

  });

});