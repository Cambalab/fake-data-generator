import fs from 'fs'
import path from 'path'
import { expect } from 'chai'
import { createFile } from '../lib/create-file'
import exampleData from '../models/example.json'
describe('Create File', () => {
  before('given a name \'example-test\' and a data object creates a json file', () => {
    const fileName = 'example-test.json'
    createFile(fileName, exampleData)
  })

  it('createFile - a file with name \'example-test.json\' must exist', () => {
    const filePath = path.resolve(__dirname, '../../output/example-test.json')
    fs.exists(filePath, (exists) => {
      expect(exists).to.eql(true)
    })
  })

  after(() => {
    const filePath = path.resolve(__dirname, '../../output/example-test.json')
    fs.unlink(filePath, (err) => {
      expect(err).to.eql(null)
    })
  })
})
