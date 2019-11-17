import createModel from './create-model'
import getModel from './get-model'
import { createFile } from './create-file'

const outputTypes = {
  // Generates the Json output
  json: ({ fileName, data }) => { createFile(fileName, data) },
  // Returns an object with the data
  object: ({ data }) => data
}

export default ({
  amountArg,
  fileName = `${new Date().toISOString()}.json`,
  modelArg,
  inputType,
  outputType
}) => {
  // Gets the model
  const model = getModel({ model: modelArg, inputType })

  // Creates the model
  const amount = amountArg
  const data   = createModel({ model, amount })

  // Returns the generated data
  return outputTypes[outputType]({ fileName, data })
}
