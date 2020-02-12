// import 'babel-polyfill'
import chai from 'chai'
chai.use(require('chai-string'));
import { expect } from 'chai'
import { parseArray, parseString, parseModel, append, prepend } from '../../lib/parse-model'
import parseModelData from '../../lib/parse-model'

describe('ParseModel', () => {

  it('parseModelData - returns parsed Object after configuring faker', () => {
    const model = {"config": {"locale": "en"}, "model":{"company": {"type": "Object", "value": {"name": {"type": "faker", "value": "company.companyName"} } } } }
    const result = parseModelData(model);
    expect(result).to.be.a('object')
    expect(result).to.have.property('company')
    expect(result.company).to.have.property('name')
  })

  it('Object - returns Object', () => {
    const model = {"company": {"type": "Object", "value": {"name": {"type": "faker", "value": "company.companyName"} } } }
    const result = parseModel(model);
    expect(result).to.be.a('object')
    expect(result).to.have.property('company')
    expect(result.company).to.have.property('name')
  })

  it('Array - returns an Array with exactly 3 entries', () => {
    const model = {value: { name: { type: 'faker', value: 'internet.domainWord' } }}
    const options = { size: 3 }
    const result = parseArray(model, options)
    expect(result).to.have.lengthOf(options.size)
  })

  it('Array - returns an Array whose length is between 4 and 10', () => {
    const model = {value: { name: { type: 'faker', value: 'internet.domainWord' } }}
    const options = { size: [ 4, 15 ] }
    const result = parseArray(model, options)
    expect(result).to.have.lengthOf.within(options.size[0], options.size[1])

  })

  it('appends - adds "pdf" to the end of a string', () => {
    const model = { type: 'faker', value: 'random.words' }
    const options = { text: '.pdf' }
    const result = append(model, options)
    expect(result).to.endsWith(options.text);
  })

  it('appends - adds "#" to the start of a random number', () => {
    const model = { type: 'randomNumberBetween', value: [ 1, 2500 ] }
    const options = { text: '#' }
    const result = prepend(model, options)
    expect(result).to.startsWith(options.text);
  })

  it('String - acts as a simple passthrough and returns what was passed in', () => {
    const model = "Banana"
    const result = parseString(model)
    expect(result).to.eql(model);
  })

  it('String with complex model - should return with unstringified object reference', () => {
    const model = { type: 'String', value: 'catacombs' }
    const str = '[object Object]'
    const result = String(model)
    expect(result).to.not.be.a('object')
    expect(result).to.be.a('string')
    expect(result).to.have.string(str)
    expect(result === JSON.stringify(model)).to.be.false
  })

  // Mix-n-Match
  describe('Ensuring everything plays nice together', () => {
    it('prepend with String - should return "Grapefruit".', () => {
      const model = { type: 'String', value: 'fruit' }
      const options = { text: 'Grape' }
      const result = prepend(model, options)
      expect(result).to.eql('Grapefruit');
      expect(result).to.startsWith(options.text);
    })

    it('append with String - should return "Grapefruit.txt".', () => {
      const model = { type: 'String', value: 'Grapefruit' }
      const options = { text: '.txt' }
      const result = append(model, options)
      expect(result).to.eql('Grapefruit.txt');
      expect(result).to.endsWith(options.text);
    })
  })
})