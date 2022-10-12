const BinaryReader = require('./BinaryReader')
const { parseHexadecimalInt } = require('./utils')

function decodeImei(buffer) {
  const reader = new BinaryReader(buffer)
  const imeiLength = parseHexadecimalInt(reader.readBytes(2))
  const isImei = imeiLength > 0

  return isImei ? reader.readBytes(imeiLength).toString('ascii') : null
}

module.exports = decodeImei
