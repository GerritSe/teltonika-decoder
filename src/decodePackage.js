const decodeCodec8 = require('./codecs/decodeCodec8')
const decodeFooter = require('./decodeFooter')
const decodeHeader = require('./decodeHeader')
const { CodecUnsupportedError } = require('./errors')
const validateRecords = require('./validateRecords')
const { dataBufferFromBuffer, footerBufferFromBuffer } = require('./utils')

function decoderForCodecId(codecId) {
  if (codecId === 8) return decodeCodec8

  throw new CodecUnsupportedError(codecId)
}

function decodeRecords(buffer) {
  const header = decodeHeader(buffer)
  const footer = decodeFooter(footerBufferFromBuffer(buffer))
  const decoder = decoderForCodecId(header.codecId)

  validateRecords(header, footer, buffer)
  
  return {
    data: decoder(dataBufferFromBuffer(buffer), header.numberOfData),
    meta: {
      ...footer,
      ...header
    }
  }
}

module.exports = decodeRecords