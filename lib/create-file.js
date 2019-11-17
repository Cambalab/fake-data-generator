import fs from 'fs'

export function createFile(fileName, data) {
  const jsonContent = JSON.stringify(data, null, '\t');

  fs.writeFile(`${process.cwd()}/${fileName}`, jsonContent, 'utf8', function (err) {
    if (err) {
      console.log('\x1b[31m', "An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log('\x1b[32m', `Your file has been saved in ${process.cwd()}/output/${fileName}.`);
  });
}
