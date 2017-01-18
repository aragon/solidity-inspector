const expect = require('chai').expect;
const SolidityStructure = require('../index');

describe('Test base ethereum contracts', function () {


  it('Mortal.sol', function () {
    var structure = SolidityStructure.parseFile(__dirname + '/fixture/Mortal.sol');
    expect(structure.toJSON()).to.deep.equal(
      {
        constantFunctions: {},
        contract: {
          constructor: {
            description: 'this function is executed at initialization and sets the owner of the contract',
            params: {},
            title: 'this function is executed at initialization and sets the owner of the contract'
          },
          description: 'Contract can be destroyed by owner',
          name: 'Mortal',
          params: {},
          title: 'Contract can be destroyed by owner'
        },
        events: {},
        functions: {
          kill: {
            description: 'Function to recover the funds on the contract',
            params: {},
            title: 'Function to recover the funds on the contract'
          }
        },
        parents: {},
        source: {
          imports: [],
          pragma: '^0.4.4'
        }
      }
    );
  });


});