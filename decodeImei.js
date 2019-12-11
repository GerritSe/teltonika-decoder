const { BinaryReader } = require('binutils64')

const { parseHexadecimalInt } = require('./utils')

function decodeImei(buffer) {
  const reader = new BinaryReader(buffer)
  const imeiLength = parseHexadecimalInt(reader.ReadBytes(2))
  const isImei = imeiLength > 0

  return isImei ? reader.ReadBytes(imeiLength) : null
}

module.exports = decodeImei
