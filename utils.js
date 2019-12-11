function parseHexadecimalInt(bytes) {
  return parseInt(bytes.toString('hex'), 16)
}

module.exports = {
  parseHexadecimalInt
}
