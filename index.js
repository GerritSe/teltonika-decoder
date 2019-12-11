const decode = require('./src/decode')
const errors = require('./src/errors')

module.exports = {
  decode,
  ...errors
}
