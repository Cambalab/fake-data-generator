import { description, homepage, name, version } from './package.json'
import generateModel from './lib'

const _generateModel = ({
  amountArg, fileName, modelArg
}) => generateModel({ amountArg, fileName, modelArg, outputType: 'object' })

module.exports = {
  description,
  name,
  version,
  doc: `Nothing to do here. Visit ${homepage} for more information.`,
  generateModel
}
