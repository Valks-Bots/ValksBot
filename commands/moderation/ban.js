exports.run = async (client, message, args) => {
  client.embed.send(message, {desc: 'Banned someone! yay!'})
}

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: true,
  permLevel: 'Moderator'
}

exports.help = {
  name: 'ban',
  usage: '<user>',
  description: 'Ban a user.'
}
