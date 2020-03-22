const NTC = require('./ntc.js')

class Utils {
  static range (num, min, max) {
    return Math.min(Math.max(parseInt(num), min), max)
  }

  static rgbToHex (r, g, b) {
    const hex = this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b)
    return '#' + hex.toUpperCase()
  }

  static componentToHex (c) {
    var hex = parseInt(c).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  static hexToColor(hex) {
    return NTC.name(hex)[1]
  }
}

module.exports = Utils
