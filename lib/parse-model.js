import faker from 'faker'
import { numbers } from './helpers'
import CONFIG from '../constants/config'


function configureFaker(config) {
  const { locale = CONFIG.FAKER_DEFAULT_LOCALE } = config
  faker.locale = locale
}

function parseModel(model) {
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

const modelAttributeTypes = {
  randomNumberBetween: numbers.randomBetween,
  randomNumberBetweenWithString: numbers.randomBetweenWithString,
  faker: (args) => Object.byString(faker, args)(),
  Object: parseModel,
  Array: parseArray
}


export default (modelData) => {
  const { config, model } = modelData
  configureFaker(config)

  const parsedModel = parseModel(model)

  return parsedModel
}
