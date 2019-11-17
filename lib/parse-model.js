import faker from 'faker'
import { numbers } from './helpers'

function configureFaker(config) {
  const { locale = 'en' } = config
  faker.locale = locale
}


/**
 * parseModel - It iterates over named keys of an object.
 * It also works for leaf "{type, value, options}" objects
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

function parseArray(model, options) {
  return [...Array(options.size).keys()].map(() => {
    return parseModel(model.value)
  });
}

function prepend(model, _options) {
  return `${_options.text}${parseModel(model)}`
}

function append(model, _options) {
  return `${parseModel(model)}${_options.text}`
}

const modelAttributeTypes = {
  randomNumberBetween: numbers.randomBetween,
  randomNumberBetweenWithString: numbers.randomBetweenWithString,
  faker: (args, options = {}) => Object.byString(faker, args)(...options),
  Object: parseModel,
  Array: parseArray,
  prepend,
  append
}


export default (modelData) => {
  const { config, model } = modelData
  configureFaker(config)

  const parsedModel = parseModel(model)

  return parsedModel
}
