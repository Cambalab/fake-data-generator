import parseModelData from './parse-model'

export const createSingle = (model, options = {}) => {
  return Object.assign({}, parseModelData(model, options))
}

export const createMany = (model, { amount }) => {
  return Array.from({ length: amount })
    .map((el, index) => createSingle(model, { amount, index }));
}

export default ({ model, amount }) => {
  // Generate a single instance or a list
  return amount === 1
    ? createSingle(model, { amount: 1, index: 0 })
    : createMany(model, { amount })
}
