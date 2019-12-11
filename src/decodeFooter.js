const { BinaryReader } = require('binutils64')

const { parseHexadecimalInt } = require('./utils')

function decodeFooter(buffer) {
  const reader = new BinaryReader(buffer)

  return {
    numberOfData: parseHexadecimalInt(reader.ReadBytes(1)),
    crc: reader.ReadInt32()
  }
}

module.exports = decodeFooter
