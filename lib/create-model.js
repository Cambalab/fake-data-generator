/**
 * Create model module
 *
 * This module is mainly responsible for parsing and returning the given model.
 */

/**
 * createSingle - Given a model, options and a function, returns a single parsed
 * model.
 * @param {Object} model An Object user defined under the "model" attribute
 * @param {Object} options An object with options
 * @param {Function} parseModel The parseModel function
 */
function createSingle(model, options = {}, parseModel) {
  return Object.assign({}, parseModel(model, options))
}

/**
 * createMany - Given a mode, an amount as option and a function, returns a list
 * of parsed models of length equal to `amount`.
 * @param {Object} model An Object user defined under the "model" attribute
 * @param {Object} options An object with options
 * @param {Function} parseModel The parseModel function
 */
function createMany(model, { amount }, parseModel) {
  return Array.from({ length: amount })
    .map((el, index) => createSingle(model, { amount, index }, parseModel));
}

/**
 * Given an Object with a model and an amount, and a parse function, returns
 * an array of parsed models.
  */
export default ({ model, amount }, parseModel) => {
  // Generate a single instance or a list
  return amount === 1
    ? createSingle(model, { amount: 1, index: 0 }, parseModel)
    : createMany(model, { amount }, parseModel)
}
