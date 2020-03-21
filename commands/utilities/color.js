const Utils = require('../../classes/utils.js')

exports.run = async (client, message, args) => {
  if (args.length < 3) { return client.embed.debug(message, 'Please specify <r> <g> <b>') }

  const r = Utils.range(parseInt(args[0]), 0, 255)
  const g = Utils.range(parseInt(args[1]), 0, 255)
  const b = Utils.range(parseInt(args[2]), 0, 255)

  if (!Number.isInteger(r) || !Number.isInteger(g) || !Number.isInteger(b)) { return client.embed.debug(message, 'Please input whole numbers for R G B') }

  const color = client.image.color(r, g, b)

  client.embed.send(message, {
    fields: [
      {
        name: 'RGB',
        value: `rgb(${r}, ${g}, ${b})\nrgb(${Math.round(r / 255 * 100)}%, ${Math.round(g / 255 * 100)}%, ${Math.round(b / 255 * 100)}%)`,
        inline: true
      },
      {
        name: 'Hex',
        value: color.hex,
        inline: true
      }],
    files: [color.attachment],
    image: 'attachment://color.png'
  })
}

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'color',
  usage: '[<r> <g> <b>]',
  description: 'Get useful information about a certain color.'
}
