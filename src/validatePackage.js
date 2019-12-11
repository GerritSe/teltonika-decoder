const { crc16 } = require('crc')

const { ChecksumError, NumberOfDataError } = require('./errors')
const { checksumBufferFromBuffer } = require('./utils')

function validatePackage(header, footer, buffer) {
  if (header.numberOfData !== footer.numberOfData) {
    throw new NumberOfDataError()
  }

  if (crc16(checksumBufferFromBuffer(buffer)) !== footer.crc) {
    throw new ChecksumError()
  }
}

module.exports = validatePackage
