const decodeImei = require('./decodeImei')
const decodePackage = require('./decodePackage')

function decode(buffer) {
  const imei = decodeImei(buffer)

  if (imei !== null) {
    return {
      imei,
      isImei: true,
      records: []
    }
  }

  return decodePackage(buffer)
}

module.exports = decode
