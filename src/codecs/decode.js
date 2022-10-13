const { StringDecoder } = require("string_decoder")

const BinaryReader = require("../BinaryReader")
const { parseHexadecimalInt } = require("../utils")

function decodeValue(reader, bytes, signed = false) {
  switch (bytes) {
    case 1: return parseHexadecimalInt(reader.readBytes(1))
    case 2: return signed ? reader.readInt16() : reader.readUInt16()
    case 4: return signed ? reader.readInt32() : reader.readUInt32()
    default: return reader.readDouble()
  }
}

function decodeIOElement(reader, id, bytes) {
  switch (id) {
    case 17:
    case 18:
    case 19: return decodeValue(reader, bytes, true)

    case 25:
    case 26:
    case 27:
    case 28:
    case 72:
    case 73:
    case 74:
    case 75:
    case 115:
    case 181:
    case 182: return decodeValue(reader, bytes, true) / 10

    case 66:
    case 67: return decodeValue(reader, bytes) / 1000

    case 252: return decodeValue(reader, bytes) === 0 ? 1 : 0

    case 30:
    case 256:
    case 264:
    case 281: return reader.readBytes(bytes).toString("ascii")

    case 331:
    case 332:
    case 333:
    case 334: return reader.readBytes(bytes).toString("hex")

    case 8:
    case 11:
    case 14:
    case 71:
    case 76:
    case 77:
    case 78:
    case 79:
    case 101:
    case 124:
    case 132:
    case 147:
    case 148:
    case 149:
    case 150:
    case 207:
    case 238:
    case 258:
    case 259:
    case 517:
    case 518:
    case 519:
    case 520:
    case 521:
    case 522: return reader.readBytes(bytes).swap64().toString("hex")

    case 385: return decodeBLE(new BinaryReader(reader.readBytes(bytes)))

    case 548: return decodeCustomBLE(new BinaryReader(reader.readBytes(bytes)))

    default: {
      if ([1, 2, 4, 8].includes(bytes)) return decodeValue(reader, bytes)
      else if (bytes === 0) return ""
      else return reader.readBytes(bytes).toString("hex")
    }
  }
}

function decodeBLE(reader) {
  const beacons = []

  reader.skipBytes(1)

  while (reader.isReadable()) {
    const beacon = {}
    const flags = reader.readUInt8()
    const isIBeacon = (flags >> 4) > 0

    beacons.push(beacon)

    if (isIBeacon) {
      const uuid = reader.readBytes(16).toString("hex")
      const major = reader.readBytes(2).toString("hex")
      const minor = reader.readBytes(2).toString("hex")
      beacon.id = [uuid, major, minor].join("")
    } else {
      const namespace = reader.readBytes(10).toString("hex")
      const instance = reader.readBytes(6).toString("hex")
      beacon.id = [namespace, instance].join("")
    }

    beacon.rssi = reader.readInt8()

    if ((flags & 2) !== 0) {
      beacon.V = reader.ReadUInt16() / 1000
    }

    if ((flags & 4) !== 0) {
      beacon.temp = reader.ReadUInt16()
    }
  }

  return beacons
}

function decodeCustomBLE(reader) {
  const beacons = []

  reader.skipBytes(1)

  while (reader.isReadable()) {
    const beacon = {}
    const totalLength = reader.readUInt8()
    const beaconReader = new BinaryReader(reader.readBytes(totalLength))

    beaconReader.skipBytes(1)

    const rssiLength = beaconReader.readUInt8()
    const unsignedRssi = parseInt(beaconReader.readBytes(rssiLength).toString("hex"), 16)

    beacon.rssi = (new Int8Array([unsignedRssi]))[0]
    beaconReader.skipBytes(1)

    const idLength = beaconReader.readInt8()

    beacon.id = beaconReader.readBytes(idLength).toString("hex")
    beaconReader.skipBytes(2)

    beacons.push(beacon)
    beaconReader.skipBytes(2)

    const beaconName = beaconReader.readBytes(10)
    const isBeaconNameValid = beaconName.toString("ascii") === new StringDecoder("utf-8").write(beaconName).toString()

    if (!isBeaconNameValid) continue

    beacon.name = beaconName.toString("ascii")
    beaconReader.skipBytes(5)

    const flags = beaconReader.readInt8()

    if ((flags & 0x01) !== 0) {
      beacon.temp = beaconReader.readInt16() / 100
    }

    if ((flags & 0x02) !== 0) {
      beacon.rh = beaconReader.readInt8()

      if (beacon.rh != null && beacon.rh < 0) {
        throw new Error(`Negative humidity of ${beacon.rh} detected.`)
      }
    }

    if ((flags & 0x04) !== 0) {
      const magnet = (flags & 0x08) !== 0

      if (magnet) {
        beacon.magnet = 1
      }
    }

    if ((flags & 0x10) !== 0) {
      const isMoving = (beaconReader.readInt16() & 0x8000) !== 0

      if (isMoving) {
        beacon.moving = 1
      }
    }

    if ((flags & 0x20) !== 0) {
      beacon.pitch = beaconReader.readInt8()
      beacon.roll = beaconReader.readInt16()
    }

    if ((flags & 0x80) !== 0) {
      beacon.V = (beaconReader.readInt8() * 10 + 2000) / 1000
    }
  }

  return beacons
}

module.exports = { decodeIOElement }
