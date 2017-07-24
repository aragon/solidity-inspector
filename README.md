# solidity-inspector

Forked from [solidity-structure](https://github.com/vitiko/solidity-structure) to extract aditional info as modifiers, access control modifiers, full [natspec](https://github.com/ethereum/wiki/wiki/Ethereum-Natural-Specification-Format) and other arbitrary info to make tools or documentation.

Parse structure of ethereum solidity contract, including enums,constructor, structs. Based on [Solidity Parser library](https://github.com/ConsenSys/solidity-parser) from [ConsenSys](https://github.com/ConsenSys).

The goal of it is to take Solidity code as input and return an object as output that can be used to describe _all_ parts of Solidity smart contract.

## Usage in code


```javascript
const SolidityStructure = require("solidity-structure");

// Parse Solidity code as a string:
let result = SolidityStructure.parse("contract { ... }");

// Or, parse a file:
let result = SolidityStructure.parseFile("./path/to/file.sol");
```

## Usage in command line

(suppose `solidity-structure` package installed globally )

`$ solidity-structure MyContract.sol > contract-structure.json`

## Examples


### Contract constructor structure


Solidity contract [HasConstructor](test/fixture/WithConstructor.sol)

```javascript
pragma solidity ^0.4.4;

/**
* Contract with constructor
*/
contract WithConstructor {

  /**
   * My constructor long long description
   * @dev my constructor short description
   * @param uintParam Description of item 1
   * @param uintParam2
   */
   function  WithConstructor (  uint uintParam,  string stringParam,  uint uintParam2) {
     //empty
   }
}
```


Structure of [constructor](test/constructor.js)

```javascript
{
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
            name : 'uintParam',
            description: 'Description of item 1',
            type: 'uint',
            typeHint: null
          },
          stringParam: {
            name: 'stringParam',
            type: 'string'
          },
          uintParam2: {
            name : 'uintParam2',
            description: '',
            type: 'uint',
            typeHint: null
          },
        }
}
 ```

### Contract enum structure


Solidity contract  [HasEnum](test/fixture/HasEnum.sol)

```javascript
pragma solidity ^0.4.4;

/**
* Contract has enum
*/
contract HasEnum {

   /**
   * My enum lon long description
   * @dev my enum short description
   * @param item1 Description of item 1
   * @param item2
   * @param item4 Item 4 some description
   */
   enum MyEnum  {
      item1,
      item2,
      item3,
      item4
   }
}
```


Structure of [enum](test/enum.js)

```javascript
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
```

Other examples can be found in [tests](test/)
