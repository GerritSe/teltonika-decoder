# teltonika-decoder

Decodes messages from Teltonika devices that use either Codec8 or Codec8Extended.

## Installation

`yarn add teltonika-decoder`

## Usage

```js
const { decode } = require("teltonika-decoder")

const result = decode(Buffer.from("...", "hex"))

if (result.isImei) {
  // The imei number of the device was sent
  console.log(result.imei)
} else {
  // Telemetry data was sent
  console.log(result.data)
}
```
