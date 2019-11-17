#!/usr/bin/env node
import generateModel from './lib'

// TODO: Evaluate modelArg is not undefined and exists in the available
// resources.

// TODO: Evaluate amount exists and is not 0

const { argv }  = process
const modelArg  = argv[2]
const amountArg = argv[3]
const fileName  = argv[4]

function printUsage(){
  console.log(`
usage:
  fake-data-generator <model_name> <amount> <output_name>

example:
  fake-data-generator example 10 example.json
`);
}

if (argv.length === 5) {
  generateModel({
    amountArg,
    fileName,
    modelArg,
    inputType: 'json',
    outputType: 'json'
  })
} else {
  printUsage()
}
