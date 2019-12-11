class DecodeError extends Error {
  constructor(message) {
    super(message || 'Error decoding Teltonika package.')
    this.name = 'DecodeError'
  }
}

class CodecUnsupportedError extends DecodeError {
  constructor(codecId) {
    super(`Codec ${codecId} is not supported.`)
    this.name = 'CodecUnsupportedError'
  }
}

class ChecksumError extends DecodeError {
  constructor() {
    super('Checksum of records is invalid.')
    this.name = 'ChecksumError'
  }
}

class NumberOfDataError extends DecodeError {
  constructor() {
    super('Number of data in header and footer of records does not match.')
    this.name = 'NumerOfDataError'
  }
}

class PreambleError extends DecodeError {
  constructor() {
    super('Preamble of records is invalid.')
    this.name = 'PreambleError'
  }
}

module.exports = {
  ChecksumError,
  CodecUnsupportedError,
  DecodeError,
  NumberOfDataError,
  PreambleError
}
