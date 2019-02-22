import { createFile } from './lib/create-file'
import { getLocation } from './lib/helpers'

const { argv } = process
const modelArg = argv[2]
const amountArg = argv[3]
const fileName = argv[4]

// TODO: Evaluate modelArg is not undefined and exists in the available
// resources.

// TODO: Evaluate amount exists and is not 0

// Gets the model
const model = require(`./resources/${modelArg}`)

let data

// Generate a single instance or a list
if (amountArg <= 1) {
  const _model = model.createSingle()
  data = _model
}
else {
  const _models = model.createMany({ amount: amountArg })
  data = _models
}

// Generate Json
createFile(fileName, data)
