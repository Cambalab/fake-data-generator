import { description, homepage, name, version } from './package.json'
import generateModel, { validate } from './lib'

module.exports = {
  description,
  name,
  version,
  doc: `Visit ${homepage} for more information.`,
  validateModel: validate,
  generateModel
}
