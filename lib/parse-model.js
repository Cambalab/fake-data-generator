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
    const { type, value } = model[currentValue]

    const _value = modelAttributeTypes[type](value)

    const _accumulator = Object.assign(accumulator, { [currentValue]: _value })
    return _accumulator
  }, {})
  return parsedModel
}

export default (modelData) => {
  const { config, model } = modelData
  configureFaker(config)

  const parsedModel = parseModel(model)

  return parsedModel
}

const modelAttributeTypes = {
  randomNumberBetween: numbers.randomBetween,
  faker: (args) => Object.byString(faker, args)(),
  Object: (args) => parseObject(args)
}
