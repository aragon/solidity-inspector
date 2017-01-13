#!/usr/bin/env node

/* eslint no-console: 0 */

var argv = require("yargs").argv;
var SolidityStructure = require("./index.js");


var structure;


if (argv.source) {
    structure = SolidityStructure.parse(argv.source);
} else {
    structure = SolidityStructure.parseFile(argv._[0]);
}
console.log(JSON.stringify(structure.toJSON(), null, 2));