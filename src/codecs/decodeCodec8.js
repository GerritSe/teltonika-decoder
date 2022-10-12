const { decodeIOElement } = require("./decode")
const BinaryReader = require("../BinaryReader")
const { decodePosition, parseHexadecimalInt } = require('../utils')

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
    timestamp: new Date(parseHexadecimalInt(reader.readBytes(8))),
    priority: parseHexadecimalInt(reader.readBytes(1)),
    gps: {
      longitude: decodePosition(reader.readInt32()),
      latitude: decodePosition(reader.readInt32()),
      altitude: reader.readInt16(),
      angle: reader.readInt16(),
      satellites: reader.readInt8(),
      speed: reader.readInt16(),
    },
    eventId: parseHexadecimalInt(reader.readBytes(2)),
    numberOfProperties: parseHexadecimalInt(reader.readBytes(2)),
    ioElements: decodeIOElements(reader)
  }
}

function decodeIOElements(reader) {
  const ioElements = []

  for (let bytes = 1; bytes <= 8; bytes *= 2) {
    const numberOfElementsInBlock = parseHexadecimalInt(reader.readBytes(2))

    for (let i = 0; i < numberOfElementsInBlock; i++) {
      const id = parseHexadecimalInt(reader.readBytes(2))
      ioElements.push({ id, value: decodeIOElement(reader, id, bytes) })
    }
  }

  return ioElements
}

module.exports = decodeCodec8
