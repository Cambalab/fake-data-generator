import { expect } from 'chai'
import { numbers } from '../../lib/helpers'

describe('Numbers', () => {

  it('randomBetween - returns a number between 1 and 2500000', () => {
    const { randomBetween } = numbers
    const from = 1
    const to = 2500000
    const randomNumber = randomBetween([from, to])

    expect(randomNumber).to.be.a('number')
    expect(randomNumber).to.be.within(from, to)
  })

  it('randomBetweenWithString - returns a number between 1 and 2500000 with prefix # and suffix *', () => {
    const { randomBetweenWithString } = numbers
    const from = 1
    const to = 2500000
    const options = { prefix: '*', suffix: '#' }
    const randomNumberWithString = randomBetweenWithString([from, to], options)
    const randomNumberWithPrefix = randomNumberWithString.split(options.prefix)
    const randomNumberWithSuffix = randomNumberWithPrefix[1].split(options.suffix)
    const randomNumberString = randomNumberWithSuffix[0]
    const randomNumber = parseInt(randomNumberString)
    const [prefix, suffix] = randomNumberWithString.split(randomNumber)

    expect(randomNumberWithString).to.be.a('string')
    expect(randomNumber).to.be.a('number')
    expect(randomNumber).to.be.within(from, to)
    expect(prefix).to.eql(options.prefix)
    expect(suffix).to.eql(options.suffix)
  })
})
