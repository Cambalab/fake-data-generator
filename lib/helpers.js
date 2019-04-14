
const randomBetween = ([min, max]) => {
  return Math.floor(Math.random()*(max-min+1)+min)
}

const randomBetweenWithString = (value, {
  after = '',
  before = ''
}) => {
  const randomNumber = randomBetween(value)
  if (!after && !before) {
    return randomNumber
  }
  return `${before}${randomNumber}${after}`
}

export const getLocation = ({ longitude = -34.6089712, latitude = -58.379539 } = {}) => {
  const r = 1000000/111300 // = 1000000 meters
  const y0 = latitude
  const x0 = longitude
  const u = Math.random()
  const v = Math.random()
  const w = r * Math.sqrt(u)
  const t = 2 * Math.PI * v
  const x = w * Math.cos(t)
  const y1 = w * Math.sin(t)
  const x1 = x / Math.cos(y0)

  const newY = y0 + y1
  const newX = x0 + x1
  return {
    latitude: newY,
    longitude: newX
  }
}

Object.byString = function(o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
}

export const numbers = {
  randomBetween,
  randomBetweenWithString
}
