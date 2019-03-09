import { createFile } from './lib/create-file'
import createModel, { createSingle, createMany } from './lib/create-model'
import { getLocation } from './lib/helpers'

const { argv }  = process
const modelArg  = argv[2]
const amountArg = argv[3]
const fileName  = argv[4]

// TODO: Evaluate modelArg is not undefined and exists in the available
// resources.

// TODO: Evaluate amount exists and is not 0

// Creates the model
const modelName = modelArg
const amount    = amountArg
const data      = createModel({ modelName, amount })

// Generates the Json output
createFile(fileName, data)
