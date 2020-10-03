/**
 * Create file module
 *
 * This module is mainly responsible for generating the output file.
 */

import fs from 'fs'

/**
 * createFile - Given a name for a file and a final generated model, creates
 * the output file.
 * @param {String} fileName The name of the output file
 * @param {Object} data An object containing parsed and generated models.
 * @return {Void}
 */
export function createFile(fileName, data) {
  try {
    fs.writeFile(`${process.cwd()}/${fileName}`, data, 'utf8', function (err) {
      if (err) {
        throw new Error(err)
      }
      console.log('\x1b[32m', `Your file has been saved in ${process.cwd()}/output/${fileName}.`);
    });
  }
  catch (err) {
    console.error(err)
  }
}
