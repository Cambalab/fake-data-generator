import faker from 'faker'
import { numbers } from './helpers'

function configureFaker(config) {
  const { locale = 'en' } = config
  faker.locale = locale
}

/**
 * parseModel - Iterates over named keys of an object while recursively parses
 * the given node, until every leaf is parsed.
 * -> An Object model type is considered a Node.
 * -> A model type different than Object is considered a Leaf.
 *
 * @param  {Object} model an object with domain-specific keys
 * @return {Object}
 */
function parseModel(model) {
  if (model.type && typeof model.type === "string") {
    const { type, value, options } = model
    return modelAttributeTypes[type](value, options)
  }
  const modelKeys = Object.keys(model)
  const parsedModel = modelKeys.reduce((accumulator, currentValue) => {
    const { type, value, options } = model[currentValue]
    const _value = modelAttributeTypes[type](value, options)

    const _accumulator = Object.assign(accumulator, { [currentValue]: _value })
    return _accumulator
  }, {})
  return parsedModel
}


/**
 * parseArray - Given a model and options, iterates 'size' times to generate
 * a list of the parsed 'model' type.
 * -> parseModel can be either a Node or a Leaf.
 *
 * @param  {Object} model   A model Node
 * @param  {Object} options [size: Number]
 * @return {Array} A parsed model
 */
function parseArray(model, options) {
  return [...Array(options.size).keys()].map(() => parseModel(model.value));
}

/**
 * append - Given a model and options, appends a value to the parsed model.
 * -> parsedModel should return a Leaf.
 * @param  {Object} model A model Node
 * @param  {Object} options [text: Number|String>]
 * @return {String} A parsed model
 */
function append(model, options) {
  return `${parseModel(model)}${options.text}`
}

/**
 * prepend - Given a model and options, prepends a value to the parsed model.
 * -> parsedModel should return a Leaf.
 * @param  {Object} model A model Node
 * @param  {Object} options [text: Number|String>]
 * @return {String} A parsed model
 */
function prepend(model, options) {
  return `${options.text}${parseModel(model)}`
}

const modelAttributeTypes = {
  // Structure types
  Object: parseModel,
  Array: parseArray,
  // Data generators types
  // -- external libs
  faker: (args, options = {}) => Object.byString(faker, args)(...options),
  // -- internal libs
  append,
  prepend,
  randomNumberBetween: numbers.randomBetween,
  randomNumberBetweenWithString: numbers.randomBetweenWithString
}


export default (modelData) => {
  const { config, model } = modelData
  configureFaker(config)

  const parsedModel = parseModel(model)

  return parsedModel
}
