const expect = require('chai').expect;
const SolidityStructure = require('../index');

describe('Test contract with function', function () {

  it('function', function () {


    let structure = SolidityStructure.parseFile(__dirname + '/fixture/HasFunction.sol');


    expect(structure.toJSON().constantFunctions).to.deep.equal(
      {
        getSomeInfo: {
          name: 'getSomeInfo',
          title: 'Get information about something',
          description: '',

          params: {
            someAddress: {
              description: 'address of something',
              name: 'someAddress',
              type: 'address',
              typeHint: null
            }
          },
          paramsSeq: [
            'someAddress'
          ],

          returns: {
            createdAt: {
              description: 'create date time of something',
              type: 'uint',
              typeHint: 'DateTime'
            },
            description: {
              description: 'Some description',
              type: 'string',
              typeHint: null
            },
            uri: {
              description: 'Uri of something',
              type: 'string',
              typeHint: 'HttpUri',
            }
          },

          returnsSeq: [
            'uri',
            'description',
            'createdAt'
          ]

        }
      }
    );
  });


});