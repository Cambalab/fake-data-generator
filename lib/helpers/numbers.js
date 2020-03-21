
const randomBetween = ([min, max]) => {
  return Math.floor(Math.random()*(max-min+1)+min)
}

const randomElementInArray = function randomElementInArray(value) {
  const ele = Math.floor(Math.random() * (value.length - 1))
  return value[ele];
}

const randomElementsInArray = (value) => {
  const subArray = [...value]
  for (let i = subArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [subArray[i], subArray[j]] = [subArray[j], subArray[i]];
  }
  return subArray.slice(0, Math.floor(Math.random() * subArray.length) || 1);
}

const randomBetweenWithString = (value, {
  prefix = '',
  suffix = ''
} = {}) => {
  const randomNumber = randomBetween(value)
  if (!prefix && !suffix) {
    return `${randomNumber}`
  }
  return `${prefix}${randomNumber}${suffix}`
}

const incrementNumber = (value, { index, from = 0 }) => {
  return from + index
}

export {
  incrementNumber,
  randomBetween,
  randomBetweenWithString,
  randomElementInArray,
  randomElementsInArray,
}
