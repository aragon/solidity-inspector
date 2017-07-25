#!/usr/bin/env node

/* eslint no-console: 0 */

const argv = require('yargs').argv;
const SolidityStructure = require('./index.js');


var structure;

if (argv.source) {
    structure = SolidityStructure.parse(argv.source);
} else {
    structure = argv._.map(f => SolidityStructure.parseFile(f))
}
structure.map(x => x.toJSON())
//console.log(JSON.stringify(structure.map(x => x.toJSON()), null, 2));
