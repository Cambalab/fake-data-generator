import faker from 'faker'
import moment from 'moment'
import { getLocation, numbers } from '../lib/helpers'

faker.locale = 'es'
const { randomize } = faker.helpers

const vehicleBrands = require('./../fixtures/vehicle-brands.json')
const vehicleModels = require('./../fixtures/vehicle-models.json')

const createSingle = ({ args } = {}) => {
  const vehicleName = randomize(vehicleBrands)
  const vehicleBrand = randomize(vehicleModels[vehicleName])
  const dateFormat = 'DD/MM/YYYY'
  const createdAt = faker.date.past()
  const formmatedCreatedAt = moment(createdAt).format(dateFormat)
  const updatedAt = faker.date.recent()
  const formmatedUpdatedAt = moment(updatedAt).format(dateFormat)
  const originPackage = {
    coordinates: getLocation(),
    address: {
      city: faker.address.city(),
      state: faker.address.state(),
      streetAddress: faker.address.streetAddress(),
      country: faker.address.country()
    },
    status: faker.helpers.randomize(['waiting', 'picked-up'])
  }
  const destinationPackage = {
    coordinates: getLocation(),
    address: {
      city: faker.address.city(),
      state: faker.address.state(),
      streetAddress: faker.address.streetAddress(),
      country: faker.address.country()
    },
    status: originPackage.status === 'waiting' ? 'waiting' : faker.helpers.randomize(['waiting', 'delivered'])
  }

  const _args = {
    id: numbers.randomBetween(1, 250000),
    transportName: faker.company.companyName(),
    driverName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    vehicle: {
      name: vehicleName,
      model: vehicleBrand
    },
    createdAt: formmatedCreatedAt,
    updatedAt: formmatedUpdatedAt,
    originPackage: {
      coordinates: {
        lat: originPackage.coordinates.latitude,
        lng: originPackage.coordinates.longitude
      },
      address: {
        city: originPackage.address.city,
        state: originPackage.address.state,
        streetAddress: originPackage.address.streetAddress,
        country: originPackage.address.country
      },
      status: originPackage.status
    },
    destinationPackage: {
      coordinates: {
        lat: destinationPackage.coordinates.latitude,
        lng: destinationPackage.coordinates.longitude
      },
      address: {
        city: destinationPackage.address.city,
        state: destinationPackage.address.state,
        streetAddress: destinationPackage.address.streetAddress,
        country: destinationPackage.address.country
      },
      status: destinationPackage.status
    }
  }
  return Object.assign({}, _args, args)
}

const createMany = ({ amount, args = {} }) => {
  const models = Array.from({ length: amount }).map((x, i) => {
    return createSingle({ args })
  });
  return models
}

// We use module.exports to dynamically require them in index.js
module.exports = {
  createSingle,
  createMany
}
