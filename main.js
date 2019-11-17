import { description, homepage, name, version } from './package.json'
import generateModel from './lib'

module.exports = {
  description,
  name,
  version,
  doc: `Visit ${homepage} for more information.`,
  generateModel
}
