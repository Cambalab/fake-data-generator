import parseModelData from './parse-model'

export const createSingle = ({ model }) => {
  return Object.assign({}, parseModelData(model))
}

export const createMany = ({ model, amount }) => {
  return Array.from({ length: amount })
    .map(() => createSingle({ model }));
}

export default ({ model, amount }) => {
  // Generate a single instance or a list
  return amount === 1
    ? createSingle({ model })
    : createMany({ model, amount })
}
