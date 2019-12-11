const decodeImei = require('./decodeImei')
const decodePackage = require('./decodePackage')

function decode(buffer) {
  const imei = decodeImei(buffer)

  if (imei !== null) {
    return {
      imei,
      isImei: true
    }
  }

  return {
    imei: null,
    isImei: false,
    ...decodePackage(buffer)
  }
}

module.exports = decode
