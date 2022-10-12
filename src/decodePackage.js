const decodeCodec8 = require('./codecs/decodeCodec8')
const decodeCodec8extended = require('./codecs/decodeCodec8extended')
const decodeFooter = require('./decodeFooter')
const decodeHeader = require('./decodeHeader')
const { CodecUnsupportedError } = require('./errors')
const validatePackage = require('./validatePackage')
const { dataBufferFromBuffer, footerBufferFromBuffer } = require('./utils')

function decoderForCodecId(codecId) {
  if (codecId === 8) return decodeCodec8
  if (codecId === 0x8e) return decodeCodec8extended

  throw new CodecUnsupportedError(codecId)
}

function decodePackage(buffer) {
  const header = decodeHeader(buffer)
  const footer = decodeFooter(footerBufferFromBuffer(buffer))
  const decoder = decoderForCodecId(header.codecId)

  validatePackage(header, footer, buffer)

  return {
    data: decoder(dataBufferFromBuffer(buffer), header.numberOfData),
    meta: {
      ...footer,
      ...header
    }
  }
}

module.exports = decodePackage
