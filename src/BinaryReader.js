
class BinaryReader {
  constructor(buffer) {
    this.buffer = buffer
    this.position = 0
  }

  skipBytes = (bytes) => {
    this.position += bytes
  }

  readBytes = (bytes) => {
    if (this.isNotReadable(bytes)) return Buffer.alloc(0)

    const targetBuffer = Buffer.alloc(bytes)
    this.buffer.copy(targetBuffer, 0, this.position, this.position + bytes)
    this.position += bytes
    return targetBuffer
  }

  readInt8 = () => {
    if (this.isNotReadable(1)) return 0

    const value = this.buffer.readInt8(this.position)
    this.position++
    return value
  }

  readUInt8 = () => {
    if (this.isNotReadable(1)) return 0

    const value = this.buffer.readUInt8(this.position)
    this.position++
    return value
  }

  readInt16 = () => {
    if (this.isNotReadable(2)) return 0

    const value = this.buffer.readInt16BE(this.position)
    this.position += 2
    return value
  }

  readUInt16 = () => {
    if (this.isNotReadable(2)) return 0

    const value = this.buffer.readUInt16BE(this.position)
    this.position += 2
    return value
  }

  readInt32 = () => {
    if (this.isNotReadable(4)) return 0

    const value = this.buffer.readInt32BE(this.position)
    this.position += 4
    return value
  }

  readUInt32 = () => {
    if (this.isNotReadable(4)) return 0

    const value = this.buffer.readUInt32BE(this.position)
    this.position += 4
    return value
  }

  readDouble = () => {
    if (this.isNotReadable(8)) return 0.0

    this.buffer.read
    const value = this.buffer.readDoubleBE(this.position)
    this.position += 8
    return value
  }

  isReadable = (bytes = 1) => this.position + bytes <= this.buffer.length
  isNotReadable = (bytes = 1) => !this.isReadable(bytes)
}

module.exports = BinaryReader
