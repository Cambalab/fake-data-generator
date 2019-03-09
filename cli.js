#!/usr/bin/env node
import generateModel from './lib'

// TODO: Evaluate modelArg is not undefined and exists in the available
// resources.

// TODO: Evaluate amount exists and is not 0

const { argv }  = process
const modelArg  = argv[2]
const amountArg = argv[3]
const fileName  = argv[4]

generateModel({ amountArg, fileName, modelArg, outputType: 'json' })
