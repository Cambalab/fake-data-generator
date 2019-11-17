
export default ({ inputType, model }) => {
  function getJsonModel(model) {
    return require(`${process.cwd()}/${model}`)
  }

  const modelInputTypes = {
    json: getJsonModel,
    object: model => model
  }

  return modelInputTypes[inputType](model)
}