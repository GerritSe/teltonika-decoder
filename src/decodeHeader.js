const BinaryReader = require('./BinaryReader')
const { PreambleError } = require('./errors')
const { parseHexadecimalInt } = require('./utils')

function decodeHeader(buffer) {
  const reader = new BinaryReader(buffer)
  const preamble = reader.readInt32()

  if (preamble !== 0) throw new PreambleError()

  return {
    dataLength: reader.readInt32(),
    codecId: parseHexadecimalInt(reader.readBytes(1)),
    numberOfData: parseHexadecimalInt(reader.readBytes(1))
  }
}

module.exports = decodeHeader
