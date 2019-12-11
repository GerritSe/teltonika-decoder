const { FOOTER_LENGTH_IN_BYTES, HEADER_LENGTH_IN_BYTES, POSITION_PRECISION } = require('./constants')

function decodePosition(position) {
  let decodedPosition = position

  if (decodedPosition.toString(2)[0] === '0') {
    decodedPosition = decodedPosition * -1
  }

  return decodedPosition / POSITION_PRECISION
}

function dataBufferFromBuffer(buffer) {
  const dataEndIndex = buffer.length - FOOTER_LENGTH_IN_BYTES
  return buffer.slice(HEADER_LENGTH_IN_BYTES, dataEndIndex)
}

function footerBufferFromBuffer(buffer) {
  const footerStartIndex = buffer.length - FOOTER_LENGTH_IN_BYTES
  return buffer.slice(footerStartIndex)
}

function parseHexadecimalInt(bytes) {
  return parseInt(bytes.toString('hex'), 16)
}

module.exports = {
  dataBufferFromBuffer,
  decodePosition,
  footerBufferFromBuffer,
  parseHexadecimalInt
}
