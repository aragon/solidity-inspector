# Solidity structure 

Parse structure of ethereum solidity contract, including enums,constructor, structs. Based on [Solidity Parser library](https://github.com/ConsenSys/solidity-parser) from [ConsenSys](https://github.com/ConsenSys).

The goal of it is to take Solidity code as input and return an object as output that can be used to describe _all_ parts of Solidity smart contract.

[![Build status](https://img.shields.io/travis/vitiko/solidity-structure/master.svg?style=flat-square)](https://travis-ci.org/vitiko/solidity-structure)
[![Coverage](https://img.shields.io/codecov/c/github/vitiko/solidity-structure.svg?style=flat-square)](https://codecov.io/github/vitiko/solidity-structure?branch=master)
[![bitHound Code](https://www.bithound.io/github/vitiko/solidity-structure/badges/code.svg)](https://www.bithound.io/github/vitiko/solidity-structure)



## Instalation

`npm install solidity-structure`


## Usage

Then, in your code:

```javascript
const SolidityStructure = require("solidity-structure");

// Parse Solidity code as a string:
let result = SolidityStructure.parse("contract { ... }");

// Or, parse a file:
let result = SolidityStructure.parseFile("./path/to/file.sol");
```

## Examples

Examples can be found in [tests](test/)
