const Canvas = require('canvas')
const Discord = require('discord.js')
const Utils = require('../classes/utils.js')

exports.color = (r, g, b) => {
  const hex = Utils.rgbToHex(r, g, b)

  const canvas = Canvas.createCanvas(100, 100)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = hex
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height)
  return {
    hex: hex,
    attachment: new Discord.MessageAttachment(canvas.toBuffer(), 'color.png')
  }
}
