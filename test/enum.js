const expect = require('chai').expect;
const SolidityStructure = require('../index');

describe('Test contract with enum', function () {

  it('Enum', function () {


    var structure = SolidityStructure.parseFile(__dirname + '/fixture/HasEnum.sol');


    expect(structure.toJSON().enums).to.deep.equal(
      {
        MyEnum: {
          name: 'MyEnum',
          title: 'my enum short description',
          description: 'My enum lon long description',
          members: [
            'item1',
            'item2',
            'item3',
            'item4'
          ],
          params: {
            item1: {
              description: 'Description of item 1'
            },
            item2: {
              description : ''
            },
            item4: {
              description: 'Item 4 some description'
            }
          }

        }
      }
    );
  });


});