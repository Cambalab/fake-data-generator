
function getModel({ modelName }) {
  const { Model } = require(`../models/${modelName}`)
  return Model()
}

export const createSingle = ({ model }) => {
  return Object.assign({}, model)
}

export const createMany = ({ model, amount }) => {
  const models = Array.from({ length: amount }).map((x, i) => {
    return createSingle({ model })
  });
  return models
}

export default ({ modelName, amount }) => {
  const model = getModel({ modelName })
  let data
  // Generate a single instance or a list
  if (amount === 1) {
    const _model = createSingle({ model })
    data = _model
  }
  else if (amount > 1) {
    const _models = createMany({ model, amount })
    data = _models
  }
  return data
}
