
const randomBetween = ([min, max]) => {
  return Math.floor(Math.random()*(max-min+1)+min)
}

const randomBetweenWithString = (value, {
  prefix = '',
  suffix = ''
}) => {
  const randomNumber = randomBetween(value)
  if (!prefix && !suffix) {
    return `${randomNumber}`
  }
  return `${prefix}${randomNumber}${suffix}`
}

export {
  randomBetween,
  randomBetweenWithString,
}
