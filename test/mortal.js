const expect = require('chai').expect;
const SolidityStructure = require('../index');

describe('Test base ethereum contracts', function () {


  it('Mortal.sol', function () {
    var structure = SolidityStructure.parseFile(__dirname + '/fixture/Mortal.sol');
    expect(structure.toJSON()).to.deep.equal(
      {
        contract: {

          constructor: null,
          // constructor: {
          //   description: 'this function is executed at initialization and sets the owner of the contract',
          //   params: {},
          //   title: 'this function is executed at initialization and sets the owner of the contract'
          // },
          title: 'Contract can be destroyed by owner',
          description: '',
          name: 'Mortal',
          params: {},
        },

        constantFunctions: {
          owner: {
            title: 'Owner of the contract',
            description: '',
            params: {},
            returns: {
              owner: {
                description: 'Owner of the contract',
                type: 'address'
              }
            }
          }
        },



        events: {},
        functions: {
          kill: {
            title: 'Function to recover the funds on the contract',
            params: {},
            description : '',
          }
        },
        parents: {
          Owned: './Owned.sol'
        },
        source: {
          imports: [{
            alias: 'Owned',
            defaultAlias: 'Owned',
            from: './Owned.sol'
          }],
          pragma: '^0.4.4'
        }
      }
    );
  });


});