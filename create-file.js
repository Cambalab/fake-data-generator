
module.exports = function createFile(fileName, data) {
  const jsonContent = JSON.stringify(data);

  fs.writeFile(fileName, jsonContent, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
}
