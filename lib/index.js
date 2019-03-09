import { createFile } from './create-file'
import createModel from './create-model'
import { getLocation } from './helpers'

const outputTypes = {
  // Generates the Json output
  json: ({ fileName, data }) => { createFile(fileName, data) },
  // Returns an object with the data
  object: ({ data }) => data
}

export default ({ amountArg, fileName = '', modelArg, outputType }) => {
  // Creates the model
  const modelName = modelArg
  const amount    = amountArg
  const data      = createModel({ modelName, amount })

  return outputTypes[outputType]({ fileName, data })
}
