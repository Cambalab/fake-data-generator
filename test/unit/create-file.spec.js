import fs from 'fs'
import { expect } from 'chai'
import { createFile } from '../../lib/create-file'
import exampleData from '../../models/example.json'

describe('Create File', () => {
  const fileName = 'example-test.json'
  const outputPath = `output/${fileName}`

  before('given a name \'example-test\' and a data object creates a json file with a model\'s data', () => {
    createFile(outputPath, exampleData)
  })

  it('createFile - a json file with name \'example-test.json\' must exist', () => {
    const filePath = outputPath
    fs.exists(`${process.cwd()}/${filePath}`, (exists) => {
      expect(exists).to.eql(true)
    })
  })

  after(() => {
    const filePath = outputPath
    fs.unlink(filePath, (error) => {
      expect(error).to.eql(null)
    })
  })
})
