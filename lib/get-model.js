/**
 * Get model module
 *
 * This module is mainly responsible for retrieving the input file to parse
 * and generate the final model.
 */

/**
 * getModel - Given an input model type and a model, returns an Object ready
 * to be parsed.
 * @param {Object} - An object containing an input type and the user defined
 * model
 *    @param {String} inputType A `json` or `object` string.
 *    @param {Object | String} inputType An user defined Object model or the
 *    name of a json file.
 * @return An Object containing the user defined model.
 */
export default function getModel({ inputType, model }) {
  function getJsonModel(model) {
    return require(`${process.cwd()}/${model}`)
  }

  const modelInputTypes = {
    json: getJsonModel,
    object: model => model
  }

  return modelInputTypes[inputType](model)
}