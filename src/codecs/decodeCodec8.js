const { BinaryReader } = require('binutils64')

const { decodePosition, parseHexadecimalInt } = require('../utils')

const IO_ELEMENTS_VALUE_READERS = Object.freeze([
  reader => parseHexadecimalInt(reader.ReadBytes(1)),
  reader => reader.ReadInt16(),
  reader => reader.ReadInt32(),
  reader => reader.ReadUInt64()
])

function decodeCodec8(buffer, numberOfData) {
  const reader = new BinaryReader(buffer)
  const records = []

  for (let currentDataIndex = 0; currentDataIndex < numberOfData; currentDataIndex++) {
    records.push(decodeRecord(reader))
  }

  return records
}

function decodeRecord(reader) {
  return {
    timestamp: new Date(parseHexadecimalInt(reader.ReadBytes(8))),
    priority: parseHexadecimalInt(reader.ReadBytes(1)),
    gps: {
      longitude: decodePosition(reader.ReadInt32()),
      latitude: decodePosition(reader.ReadInt32()),
      altitude: reader.ReadInt16(),
      angle: reader.ReadInt16(),
      satellites: reader.ReadInt8(),
      speed: reader.ReadInt16(),
    },
    eventId: parseHexadecimalInt(reader.ReadBytes(1)),
    numberOfProperties: parseHexadecimalInt(reader.ReadBytes(1)),
    ioElements: decodeIOElements(reader)
  }
}

function decodeIOElements(reader) {
  const ioElements = []

  IO_ELEMENTS_VALUE_READERS.forEach(valueReader => {
    const numberOfElements = parseHexadecimalInt(reader.ReadBytes(1))

    for (let currentElementIndex = 0; currentElementIndex < numberOfElements; currentElementIndex++) {
      ioElements.push({
        id: parseHexadecimalInt(reader.ReadBytes(1)),
        value: valueReader(reader)
      })
    }
  })

  return ioElements
}

module.exports = decodeCodec8
