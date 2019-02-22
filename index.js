const createFile = require('./create-file')

console.log(process.argv)
const { argv } = process
const modelArg = argv[2]
const amountArg = argv[3]

// TODO: Evaluate available resources and catch error

const model = require(`./resources/${modelArg}`)
