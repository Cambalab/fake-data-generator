import createModel from './create-model'
import getModel from './get-model'
import { createFile } from './create-file'

const outputTypes = {
  // Generates the Json output
  json: ({ fileName, data }) => {
    const stringifiedData = JSON.stringify(data, null, '\t')
    createFile(fileName, stringifiedData)
  },
  // Returns an object
  object: ({ data }) => data
}

export const validate = (model) => {
  console.log(':DDD')
  return model
}

export default ({
  amountArg = 1,
  fileName = `${new Date().toISOString()}.json`,
  modelArg,
  inputType = 'json',
  outputType = 'object'
}) => {
  try {
    // Gets the model
    const model = getModel({ model: modelArg, inputType })
    const validatedModel = validate(model)
    // Creates the model
    const { amount = amountArg } = model
    const data   = createModel({ model, amount })

    // Returns the generated data
    return outputTypes[outputType]({ fileName, data })
  }
  catch (error) {
    console.error(error)
  }
}
