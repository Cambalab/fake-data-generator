import fs from 'fs'
import path from 'path'
import { expect } from 'chai'
import { createFile } from '../lib/create-file'
import exampleData from '../models/example.json'

describe('Create File', () => {
  const fileName = 'example-test.json'

  before('given a name \'example-test\' and a data object creates a json file', () => {
    createFile(fileName, exampleData)
  })

  it('createFile - a file with name \'example-test.json\' must exist', () => {
    const filePath = path.resolve(__dirname, `../../output/${fileName}`)
    fs.exists(filePath, (exists) => {
      expect(exists).to.eql(true)
    })
  })

  after(() => {
    const filePath = path.resolve(__dirname, `../../output/${fileName}`)
    fs.unlink(filePath, (err) => {
      expect(err).to.eql(null)
    })
  })
})
