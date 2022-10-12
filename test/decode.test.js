const { decode } = require("../")

describe("decode", () => {
  describe("imei", () => {
    const result = decode(Buffer.from("000f333539363333313031393534383239", "hex"))

    expect(result.isImei).toBe(true)
    expect(result.imei).toEqual("359633101954829")
    expect(result.data).not.toBeDefined()
  })

  describe("codec 8 extended", () => {
    it("decodes data", () => {
      const result = decode(Buffer.from("00000000000000458e0100000175b756bf4800054078e51f56904d0000000000000000000008000600ef0000f00000500400150200c80300450300010042316d000100100007dcee000000000100003999", "hex"))

      expect(result.isImei).toBe(false)
      expect(result.imei).toBeNull()

      expect(result.data).toMatchSnapshot()
    })

    it("decodes with BLE data", () => {
      const result = decode(Buffer.from("00000000000004e18e1800000177aa4b85210005407d201f569230003800000600000181000100000000000000000001018100011100000177aa4bac310005407d201f5692300036000006000001810001000000000000000000010181001711210102030405060708090a0b0c0d0e0f10020b010ac800000177aa4bd3410005407d201f569230003600000500000181000100000000000000000001018100011100000177aa4bf2800005407d201f5692300036000005000000000006000300ef0000c80001070100010042323b0001001000000d6a00000001014b0002000300000177aa4bfa510005407d201f569230003600000500000181000100000000000000000001018100011100000177aa4c21610005407d201f5692300032000006000001810001000000000000000000010181001711210102030405060708090a0b0c0d0e0f10020b010ace00000177aa4c48710005407d201f569230003200000600000181000100000000000000000001018100011100000177aa4c6f810005407d201f569230003200000400000181000100000000000000000001018100011100000177aa4c96910005407d201f5692300031000005000001810001000000000000000000010181001711210102030405060708090a0b0c0d0e0f10020b010ad000000177aa4cbda10005407d201f569230003100000400000181000100000000000000000001018100011100000177aa4cdce00005407d201f5692300031000005000000000006000300ef0000c80001070100010042323a0001001000000d6a00000001014b0002000300000177aa4ce4b10005407d201f569230003100000500000181000100000000000000000001018100011100000177aa4d0bc10005407d201f5692300031000005000001810001000000000000000000010181001711210102030405060708090a0b0c0d0e0f10020b010ac800000177aa4d32d10005407d201f569230003100000400000181000100000000000000000001018100011100000177aa4d59e10005407d201f569230003100000500000181000100000000000000000001018100011100000177aa4d80f10005407d201f5692300030000006000001810001000000000000000000010181001711210102030405060708090a0b0c0d0e0f10020b010ace00000177aa4da8010005407d201f569230003000000600000181000100000000000000000001018100011100000177aa4dc7400005407d201f569230002f000004000000000006000300ef0000c80001070100010042323b0001001000000d6a00000001014b0002000300000177aa4dcf110005407d201f569230002e00000500000181000100000000000000000001018100011100000177aa4df6210005407d201f569230002d000005000001810001000000000000000000010181001711210102030405060708090a0b0c0d0e0f10020b010ad000000177aa4e1d310005407d201f569230002c00000500000181000100000000000000000001018100011100000177aa4e44410005407d201f569230002800000400000181000100000000000000000001018100011100000177aa4e6b510005407d201f5692300025000004000001810001000000000000000000010181001711210102030405060708090a0b0c0d0e0f10020b010ac800000177aa4e92610005407d201f56923000250000050000018100010000000000000000000101810001111800001ade", "hex"))

      expect(result.isImei).toBe(false)
      expect(result.imei).toBeNull()

      expect(result.data).toMatchSnapshot()
    })

    it("decodes with custom BLE data", () => {
      const result = decode(Buffer.from("00000000000001f28e080000017e7e253e08000540798c1f56936d0027012407000000ef0005000400ef0100f00100c80000715700010042344f0000000000000000017e7e2549c000054078601f56938e0026010208000000f00005000400ef0100f00100c80000715700010042344f0000000000000000017e7e254db3000540781d1f56939f0025010208000002240001000000000000000000010224004b01200001c801067cd9f400d1c202130b094944315f46383336414106ff9a0801806a280001ca01067cd9f41a2d0a021b0b09312e2053656e736f72580eff9a0801b70a762a8e49ffff9f660000017e7e255578000540782e1f56938e0025010207000000ef0005000400ef0000f00000c8000071560001004233940000000000000000017e7e255582000540782e1f56938e0025010207000000f00005000400ef0000f00000c8000071560001004233940000000000000000017e7e255d48000540782e1f56938e0025010206000000ef0005000400ef0100f00100c8000071580001004234280000000000000000017e7e255d52000540782e1f56938e0025010206000000f00005000400ef0100f00100c8000071580001004234280000000000000000017e7e25845800054073c01f5694560022008805000700000005000400ef0100f00100c800007157000100423440000000000000080000ee39", "hex"))

      expect(result.isImei).toBe(false)
      expect(result.imei).toBeNull()

      expect(result.data).toMatchSnapshot()
    })

    it("decodes with custom BLE data that is faulty", () => {
      const result = decode(Buffer.from("00000000000004cd8e100000017e785c490800054074781f5696f10065000000000001070006000500ef0000f00000c8000071000107010001004230f00000000000000000017e78934ef800054074781f5696f1003300000e000000000005000400ef0000f00000c8000071580001004230e30000000000000000017e7893628b00054074781f5696f1003300000d000002240001000000000000000000010224004b01200001c901067cd9f400d1c202130b094944315f46383336414106ff9a08018067280001c701067cd9f41a2d0a021b0b09312e2053656e736f72580eff9a0801b7022d330d04fbffa1620000017e78c4e26b00054074781f5696f1004d00000b00000224000100000000000000000001022400a001200001d001067cd9f400d1c202130b094944315f46383336414106ff9a08018067280001c701067cd9f41a2d0a021b0b09312e2053656e736f72580eff9a0801b70196340d04fbffa1612b0001a301067cd9f404d58e021e0201060303aafe1716aafe0002fa5f2f74868d55aaa50ada1e31380055002800019f01067cd9f4191fa3021b0b09322e2053656e736f72780eff9a0801b709bf1c00830000026b0000017e78c4ee180005407b2c1f5695d5004d000f0b000000ef0005000400ef0100f00100c8000071580001004231360000000000000000017e78c4ee220005407b2c1f5695d5004d000f0b000000f00005000400ef0100f00100c8000071580001004231360000000000000000017e78c511400005407b2c1f569550004e00bf0b000000000005000400ef0100f00100c8000071580001004235210000000000000000017e78c538500005407b2c1f569550004e00bf0b000000000005000400ef0100f00100c8000071580001004234b90000000000000000017e78c5579b0005407b2c1f569550004e00bf0b00000224000100000000000000000001022400a001200001c601067cd9f400d1c202130b094944315f46383336414106ff9a08018067280001b201067cd9f41a2d0a021b0b09312e2053656e736f72580eff9a0801b70195340d04fbffa1612b0001a701067cd9f404d58e021e0201060303aafe1716aafe0002fa5f2f74868d55aaa50ada1e31380055002800019d01067cd9f4191fa3021b0b09322e2053656e736f72780eff9a0801b709c01c00830000026b0000017e78c55f600005407b2c1f569550004e00bf0b000000ef0005000400ef0000f00000c8000071580001004234170000000000000000017e78c55f6a0005407b2c1f569550004e00bf0b000000f00005000400ef0000f00000c8000071580001004234170000000000000000017e78c567300005407b2c1f569550004e00bf0a000000ef0005000400ef0100f00100c8000071570001004233ce0000000000000000017e78c56b180005407b2c1f569550004e00bf0b000000f00005000400ef0100f00100c8000071570001004233ce0000000000000000017e78c58e400005407b2c1f569550004e00bf0b000000ef0005000400ef0000f00000c8000071550001004233690000000000000000017e78c59de00005407b2c1f569550004e00bf0a000000f00005000400ef0000f00000c8000071550001004233690000000000000000017e78c5a5b00005407b2c1f569550004e00bf0a000000ef0005000400ef0100f00100c80000715800010042340d0000000000001000000dee", "hex"))

      expect(result.isImei).toBe(false)
      expect(result.imei).toBeNull()

      expect(result).toMatchSnapshot()
    })
  })

  describe("codec 8", () => {
    it("decodes data", () => {
      const result = decode(Buffer.from("0000000000000045080100000175b756bf4800054078e51f56904d0000000000000000000008000600ef0000f00000500400150200c80300450300010042316d000100100007dcee0000010000de4c", "hex"))

      expect(result.isImei).toBe(false)
      expect(result.imei).toBeNull()

      expect(result.data).toMatchSnapshot()
    })

    it("raises when the header does not match the footer amount of data", () => {
      expect(() => {
        new TeltonikaTelemetryDecoder(Buffer.from("00000000000000458e0200000175b756bf4800054078e51f56904d0000000000000000000008000600ef0000f00000500400150200c80300450300010042316d000100100007dcee000000000100003999", "hex")).decode()
      }).toThrowError()
    })

    it("raises when the checksum is incorrect", () => {
      expect(() => {
        new TeltonikaTelemetryDecoder(Buffer.from("00000000000000458e0100000175b756bf4800054078e51f56904d0000000000000000000008000600ef0000f00000500400150200c80300450300010042316d000100100007dcee000000000100003990", "hex")).decode()
      }).toThrowError()
    })
  })

  it("raises when the codec is unknown", () => {
    expect(() => {
      new TeltonikaTelemetryDecoder(Buffer.from("0000000000000045820100000175b756bf4800054078e51f56904d0000000000000000000008000600ef0000f00000500400150200c80300450300010042316d000100100007dcee000000000100003999", "hex")).decode()
    }).toThrowError()
  })
})