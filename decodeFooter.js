const { BinaryReader } = require('binutils64')

const { FOOTER_LENGTH_IN_BYTES } = require('./constants')
const { parseHexadecimalInt } = require('./utils')

function decodeFooter(buffer) {
  const footerStartIndex = buffer.length - FOOTER_LENGTH_IN_BYTES
  const footerBuffer = buffer.slice(footerStartIndex)
  const reader = new BinaryReader(footerBuffer)

  return {
    numberOfData: parseHexadecimalInt(reader.ReadBytes(1)),
    crc: reader.ReadInt32()
  }
}

module.exports = decodeFooter
