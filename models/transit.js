import faker from 'faker'
import moment from 'moment'
import { getLocation, numbers } from '../lib/helpers'

faker.locale = 'es'
const { randomize } = faker.helpers

const vehicleBrands = require('./../fixtures/vehicle-brands.json')
const vehicleModels = require('./../fixtures/vehicle-models.json')

const Model = () => {
  const vehicleName = randomize(vehicleBrands)
  const vehicleBrand = randomize(vehicleModels[vehicleName])
  const createdAt = faker.date.past()
  const formmatedCreatedAt = moment(createdAt).format()
  const updatedAt = faker.date.recent()
  const formmatedUpdatedAt = moment(updatedAt).format()
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

  const args = {
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
  return args
}

// We use module.exports to dynamically require the model
module.exports = {
  Model
}
