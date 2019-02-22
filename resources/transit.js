const { numbers } = require('../lib/helpers')
console.log('Numbers', numbers)

const createSingle = (args = {}) => {
  const _args = {
    id: numbers.randomBetween(1, 250000),
    transportName: "",
    driverName: "",
    vehicle: {
      name: "",
      model: ""
    },
    createdAt: "",
    updatedAt: "",
    originPackage: {
      coordinates: {
        lat: "",
        lng: ""
      },
      address: "",
      status: ""
    },
    destinationPackage: {
      coordinates: {
        lat: "",
        lng: ""
      },
      address: "",
      status: ""
    }
  }
  return Object.assign({}, _args, args)
}

module.exports = {
  createSingle
}
