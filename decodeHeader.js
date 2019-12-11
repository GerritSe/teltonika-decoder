const { BinaryReader } = require('binutils64')

const { PreambleError } = require('./errors')
const { parseHexadecimalInt } = require('./utils')

function decodeHeader(buffer) {
  const reader = new BinaryReader(buffer)
  const preamble = reader.ReadInt32()

  if (preamble !== 0) throw new PreambleError()

  return {
    dataLength: reader.ReadInt32(),
    codecId: parseHexadecimalInt(reader.ReadBytes(1)),
    numberOfData: parseHexadecimalInt(reader.ReadBytes(1))
  }
}

module.exports = decodeHeader
