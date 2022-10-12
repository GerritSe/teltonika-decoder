const BinaryReader = require('./BinaryReader')
const { parseHexadecimalInt } = require('./utils')

function decodeFooter(buffer) {
  const reader = new BinaryReader(buffer)

  return {
    numberOfData: parseHexadecimalInt(reader.readBytes(1)),
    crc: reader.readInt32()
  }
}

module.exports = decodeFooter
