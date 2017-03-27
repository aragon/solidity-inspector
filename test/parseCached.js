const expect = require('chai').expect;
const SolidityStructure = require('../index');

describe('Cache parse results', function () {

  it('Cache json structure', function () {

    let structure1 = SolidityStructure.parseFileToJson(__dirname + '/fixture/WithConstructor.sol', { useCache: true });
    let structure2 = SolidityStructure.parseFileToJson(__dirname + '/fixture/WithConstructor.sol', { useCache: true });


    const match = {
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
          name: 'uintParam',
          description: 'Description of item 1',
          type: 'uint',
          typeHint: null
        },
        stringParam: {
          name: 'stringParam',
          type: 'string'
        },
        uintParam2: {
          name: 'uintParam2',
          description: '',
          type: 'uint',
          typeHint: null
        },
      }
    };

    expect(structure1.contract.constructor).to.deep.equal(match);
    expect(structure2.contract.constructor).to.deep.equal(match);
  });


});
