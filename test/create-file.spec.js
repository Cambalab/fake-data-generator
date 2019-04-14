import fs from 'fs'
import path from 'path'
import { expect } from 'chai'
import { createFile } from '../lib/create-file'
import exampleData from '../models/example.json'

describe('Create File', () => {
  const fileName = 'example-test.json'
  const outputDir = path.resolve(__dirname, `../../output/${fileName}`)

  before('given a name \'example-test\' and a data object creates a json file with a model\'s data', () => {
    createFile(fileName, exampleData)
  })

  it('createFile - a json file with name \'example-test.json\' must exist', () => {
    const filePath = outputDir
    fs.exists(filePath, (exists) => {
      expect(exists).to.eql(true)
    })
  })

  after(() => {
    const filePath = outputDir
    fs.unlink(filePath, (error) => {
      expect(error).to.eql(null)
    })
  })
})
