const decodeCodec8 = require('./codecs/decodeCodec8')
const decodeFooter = require('./decodeFooter')
const decodeHeader = require('./decodeHeader')
const { CodecUnsupportedError } = require('./errors')
const validateRecords = require('./validateRecords')

function decoderForCodecId(codecId) {
  if (codecId === 8) return decodeCodec8

  throw new CodecUnsupportedError(codecId)
}

function decodeRecords(buffer) {
  const { codecId, ...header } = decodeHeader(buffer)
  const footer = decodeFooter(buffer)
  const decoder = decoderForCodecId(codecId)

  validateRecords(header, footer, buffer)
  
  return {
    meta: {
      codecId,
      ...footer,
      ...header
    },
    records: decoder(buffer)
  }
}

module.exports = decodeRecords
