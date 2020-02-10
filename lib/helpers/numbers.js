
const randomBetween = ([min, max]) => {
  return Math.floor(Math.random()*(max-min+1)+min)
}

var randomArray = function randomElementInArray(arr) {
  const ele = Math.floor(Math.random()*(arr.length))
  return arr[ele];
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
  randomArray,
  randomBetweenWithString,
}
