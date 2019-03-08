import faker from 'faker'
import moment from 'moment'
import { getLocation, numbers } from '../lib/helpers'

faker.locale = 'es'
const { randomize } = faker.helpers

const shipmentContentTypes  = require('../fixtures/shipment-content-types.json')
const truckTypes            = require('../fixtures/truck-types.json')
const trailerTypes          = require('../fixtures/trailer-types.json')
const packagingTypes        = require('../fixtures/packaging-types.json')
const productTypes          = require('../fixtures/product-types.json')

const Model = () => {
  const dateFormat = 'DD/MM/YYYY'
  const createdAt = faker.date.recent()

  const originStartShippingPeriod = randomize(['', moment(createdAt).add(3, 'days').format()])
  const originEndShippingPeriod = originStartShippingPeriod === '' ? '' : moment(createdAt).add(10, 'hours').format()
  const destinationStartShippingPeriod = randomize(['', moment(createdAt).add(20, 'days').format()])
  const destinationEndShippingPeriod = destinationStartShippingPeriod === '' ? '' : moment(createdAt).add(20, 'days').add(10, 'hours').format()

  const statusArray = ['En Espera']

  const origin = {
    coordinates: getLocation(),
    address: {
      city: faker.address.city(),
      state: faker.address.state(),
      streetAddress: faker.address.streetAddress(),
      country: faker.address.country()
    },
    shippingPeriod: {
      start: originStartShippingPeriod,
      end: originEndShippingPeriod
    }
  }
  const destination = {
    coordinates: getLocation(),
    address: {
      city: faker.address.city(),
      state: faker.address.state(),
      streetAddress: faker.address.streetAddress(),
      country: faker.address.country()
    },
    shippingPeriod: {
      start: destinationStartShippingPeriod,
      end: destinationEndShippingPeriod
    }
  }

  const args = {
    id: numbers.randomBetween(1, 250000),
    createdAt,
    origin: {
      coordinates: {
        latitude: origin.coordinates.latitude,
        longitude: origin.coordinates.longitude,
        status: 'WAITING'
      },
      address: {
        city: origin.address.city,
        state: origin.address.state,
        streetAddress: origin.address.streetAddress,
        country: origin.address.country
      },
      shippingPeriod: origin.shippingPeriod
    },
    destination: {
      coordinates: {
        latitude: destination.coordinates.latitude,
        longitude: destination.coordinates.longitude,
        status: 'WAITING'
      },
      address: {
        city: destination.address.city,
        state: destination.address.state,
        streetAddress: destination.address.streetAddress,
        country: destination.address.country
      },
      shippingPeriod: destination.shippingPeriod
    },
    shipment: {
      status: randomize(statusArray),
      shipmentContentTypes: randomize(shipmentContentTypes),
      type: "Completa",
      packagingType: randomize(packagingTypes),
      productType: randomize(productTypes),
      truck: {
        quantity: numbers.randomBetween(1, 10),
        truckType: randomize(truckTypes),
        trailerType: randomize(trailerTypes)
      },
      hasCustody: faker.random.boolean(),
      hasAssurance: faker.random.boolean(),
      bidder: {
        id: numbers.randomBetween(1, 250000),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        telephone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        bidValue: numbers.randomBetween(10000, 200000)
      }
    }
  }
  return args
}

// We use module.exports to dynamically require the model
module.exports = {
  Model
}
