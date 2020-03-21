import { expect } from 'chai'
import { numbers } from '../../../lib/helpers'

describe('Numbers', () => {

  const from = 1
  const to = 2500000
  const options = { prefix: '#', suffix: '*' }

  it('randomBetween - returns a number between 1 and 2500000', () => {
    const { randomBetween } = numbers
    const from = 1
    const to = 2500000
    const randomNumber = randomBetween([from, to])

    expect(randomNumber).to.be.a('number')
    expect(randomNumber).to.be.within(from, to)
  })

  it('randomElementInArray - returns a random value from an array', () => {
    const { randomElementInArray } = numbers
    const arr = ['One','Two','Three','Four]']
    const element = randomElementInArray(arr)

    expect(arr).to.include(element);
  })

  it('randomElementsInArray - returns a random subgroup from an array', () => {
    const { randomElementsInArray } = numbers
    const arr = ['One','Two','Three','Four]']
    const elements = randomElementsInArray(arr)

    expect(elements).to.be.an('array').that.is.not.empty;
    // expect(arr).to.include(element);
  })

  it('randomBetweenWithString - returns a number between 1 and 2500000 with prefix \'#\' and suffix \'*\'', () => {
    const { randomBetweenWithString } = numbers
    const randomNumberWithString = randomBetweenWithString([from, to], options)
    const {
      prefix,
      suffix,
      value,
    } = splitValues(options.prefix, options.suffix, randomNumberWithString)

    expect(randomNumberWithString).to.be.a('string')
    expect(value).to.be.a('string')
    expect(parseInt(value)).to.be.within(from, to)
    expect(prefix).to.eql(options.prefix)
    expect(suffix).to.eql(options.suffix)
  })

  it('randomBetweenWithString - returns a number between 1 and 2500000 with prefix \'#\' and no suffix', () => {
    const { randomBetweenWithString } = numbers
    const randomNumberWithString = randomBetweenWithString(
      [from, to],
      { prefix: options.prefix }
    )
    const {
      prefix,
      suffix,
      value,
    } = splitValues(options.prefix, undefined, randomNumberWithString)

    expect(randomNumberWithString).to.be.a('string')
    expect(value).to.be.a('string')
    expect(parseInt(value)).to.be.within(from, to)
    expect(prefix).to.eql(options.prefix)
    expect(suffix).to.eql('')
  })

  it('randomBetweenWithString - returns a number between 1 and 2500000 with no prefix and suffix \'*\'', () => {
    const { randomBetweenWithString } = numbers
    const randomNumberWithString = randomBetweenWithString(
      [from, to],
      { suffix: options.suffix }
    )
    const {
      prefix,
      suffix,
      value,
    } = splitValues(undefined, options.suffix, randomNumberWithString)

    expect(randomNumberWithString).to.be.a('string')
    expect(value).to.be.a('string')
    expect(parseInt(value)).to.be.within(from, to)
    expect(prefix).to.eql('')
    expect(suffix).to.eql(options.suffix)
  })

  it('randomBetweenWithString - returns a number between 1 and 2500000 with no prefix and no suffix', () => {
    const { randomBetweenWithString } = numbers
    const randomNumberWithString = randomBetweenWithString([from, to])
    const {
      prefix,
      suffix,
      value,
    } = splitValues(undefined, undefined, randomNumberWithString)

    expect(randomNumberWithString).to.be.a('string')
    expect(value).to.be.a('string')
    expect(parseInt(value)).to.be.within(from, to)
    expect(prefix).to.eql('')
    expect(suffix).to.eql('')
  })
})


function splitValues(_prefix = '', _suffix = '', string) {
  if (!_prefix && !_suffix) {
    return { value: string, prefix: _prefix, suffix: _suffix }
  }
  if (!_prefix && _suffix) {
    const value = string.split(_suffix)[0]
    const [prefix, suffix] = string.split(value)
    return { prefix, suffix, value }
  }
  if (_prefix && !_suffix) {
    const value = string.split(_prefix)[1]
    const [prefix, suffix] = string.split(value)
    return { prefix, suffix, value }
  }
  const value = string.split(_suffix)[0].split(_prefix)[1]
  const [prefix, suffix] = string.split(value)
  return {
    prefix,
    suffix,
    value,
  }
}
