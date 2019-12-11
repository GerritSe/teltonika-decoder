const { crc16 } = require('crc')

const { CHECKSUM_LENGTH_IN_BYTES, CHECKSUM_START_IN_BYTES } = require('./constants')
const { ChecksumError, NumberOfDataError } = require('./errors')

function validateRecords(header, footer, buffer) {
  if (header.numberOfData !== footer.numberOfData) {
    throw new NumberOfDataError()
  }

  const checksumEndIndex = buffer.length - CHECKSUM_LENGTH_IN_BYTES
  const checksumBuffer = buffer.slice(CHECKSUM_START_IN_BYTES, checksumEndIndex)

  if (crc16(checksumBuffer) !== footer.crc) {
    throw new ChecksumError()
  }
}

module.exports = validateRecords
