import faker from 'faker'
import { numbers } from './helpers'
import CONFIG from '../constants/config'

function configureFaker(config) {
  const { locale = CONFIG.FAKER_DEFAULT_LOCALE } = config
  faker.locale = locale
}

export default (modelData) => {
  const { config, model } = modelData
  configureFaker(config)

  const modelKeys = Object.keys(model)
  const parsedModel = modelKeys.reduce((accumulator, currentValue) => {
    const { type, value } = model[currentValue]

    const _value = modelAttributeTypes[type](value)

    const _accumulator = Object.assign(accumulator, { [currentValue]: _value })
    return _accumulator
  }, {})

  return parsedModel
}

const modelAttributeTypes = {
  randomNumberBetween: numbers.randomBetween,
  faker: (args) => Object.byString(faker, args)(),
}
