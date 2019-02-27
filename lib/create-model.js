
function getModel({ modelName }) {
  const { Model } = require(`../models/${modelName}`)
  return Model()
}

export const createSingle = ({ modelName }) => {
  const model = getModel({ modelName })
  return Object.assign({}, model)
}

export const createMany = ({ modelName, amount }) => {
  const models = Array.from({ length: amount }).map((x, i) => {
    return createSingle({ modelName })
  });
  return models
}

export default ({ modelName, amount }) => {
  let data
  // Generate a single instance or a list
  if (amount === 1) {
    const _model = createSingle({ modelName })
    data = _model
  }
  else if (amount > 1) {
    const _models = createMany({ modelName, amount })
    data = _models
  }
  return data
}
