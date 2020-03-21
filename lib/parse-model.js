import faker from 'faker'
import { numbers } from './helpers'

function configureFaker(config) {
  const { locale = 'en' } = config
  faker.locale = locale
}

/**
 * parseModel - Iterates over named keys of an object while recursively parses
 * the given node, until every leaf is parsed. Starts parsing parents, then
 * that parent's children until it ends.
 * -> An Object model type is considered a Node.
 * -> A model type different than Object is considered a Leaf.
 *
 * @param  {Object} model an object with domain-specific keys
 * @return {Object}
 */
function parseModel(model, options) {
  // FIXME
  // if model.type is not an Object or Array...
  if (model.type && typeof model.type === "string") {
    const { type, value, options: currentModelOptions = {} } = model
    const updatedOptions = Object.assign({}, options, currentModelOptions)
    return modelAttributeTypes[type](value, updatedOptions)
  }
  const modelKeys = Object.keys(model)
  return modelKeys.reduce((accumulator, currentValue) => {
    const {
      type,
      value,
      options: currentModelOptions = {},
    } = model[currentValue]

    // Propagates initial options
    const updatedOptions = Object.assign({}, options, currentModelOptions)
    const _value = modelAttributeTypes[type](value, updatedOptions)

    // asignates currentValue, which is the current scanned attribute of the
    // model, starting from parents to children
    return Object.assign(accumulator, { [currentValue]: _value })
  }, {})
}


/**
 * parseArray - Takes a model, options, and size. If the size is an Array (ex. [1, 20])
 * it will use the randomBetween method from numbers to get a random number between
 * the first and second index.
 * If size is a simple number, it just uses that.
 * -> parseModel can be either a Node or a Leaf.
 *
 * @param  {Object} model   A model Node
 * @param  {Object} options [size: Number]
 * @return {Array} A parsed model
 */
function parseArray(model, options) {
  let size = options.size;
  if (Array.isArray(size)) {
    size = numbers.randomBetween(size)
  }
  return [...Array(size).keys()].map(() => parseModel(model.value, options));
}

/**
 * parseLiteral - For those times when you simply need a literal value
 *
 * @param  {Any} model A model Node
 * @return {Any} Any given value
 */
function parseLiteral(model) {
  return model;
}

/**
 * parseString - For those times when you simply need a string value
 *
 * @param  {Any} model A model Node
 * @return {Any} Any given value
 */
function parseString(model) {
  console.warn('\x1b[33m%s\x1b[0m', 'Deprecation warning: Please use \'Literal\' instead of \'String\'. See more: https://github.com/Cambalab/fake-data-generator/tree/develop#literal')
  return model;
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
  Literal: parseLiteral,
  String: parseString,
  // Data generators types
  // -- external libs
  faker: (args, options = {}) => Object.byString(faker, args)(...options),
  // -- internal libs
  // ---- strings
  append,
  prepend,
  // ---- numbers
  incrementNumber: numbers.incrementNumber,
  randomNumberBetween: numbers.randomBetween,
  randomElementInArray: numbers.randomElementInArray,
  randomElementsInArray: numbers.randomElementsInArray,
  randomNumberBetweenWithString: numbers.randomBetweenWithString
}

export {
  parseArray,
  parseLiteral,
  parseModel,
  parseString,
  append,
  prepend
}

/**
 * parseModelData- Given a model, configures faker and returns a parsed model.
 * @param {Object} modelData An object containing the model data, usually
 * containing a 'config' and 'model' parent attributes
 * @param {Object} options Different options provided from the model creation
 * step
 * @return {Any} Returns a parsed model
 */
export default (modelData, options = {}) => {
  const { config = {}, model } = modelData

  configureFaker(config)

  return parseModel(model, options)
}
