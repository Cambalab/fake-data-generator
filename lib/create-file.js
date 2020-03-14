import fs from 'fs'

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
