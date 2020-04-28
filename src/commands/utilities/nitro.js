exports.run = async (client, message, args) => {
  if (args.length < 1) return client.embed.debug(message, client.commands.get('nitro').help.usage)

  if (args[1] === undefined) args[1] = 'message'

  const emoji = client.find(message, args[0].replace(/[0-9<>:]/g, ''), 'emoji')

  if (!emoji) return client.embed.debug(message, 'Make sure you spelt the emoji correctly. Also case senistive!')

  if (args[1] === 'message') {
    return message.channel.send(`<${emoji.animated ? '' : ':'}${emoji.identifier}>`)
  }

  if (args[1] === 'react') {
    return message.channel.messages.fetch({ limit: 1, before: message.id }).then(messages => {
      const msg = messages.first()
      msg.react(client.guilds.cache.get(emoji.guild.id).emojis.cache.get(emoji.id))
    })
  }
}

exports.conf = {
  enabled: true,
  aliases: ['nitr'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'nitro',
  usage: '<emote> [message | react]',
  description: 'Get any emote that the bot is in and send it as a message or react to a message with it.'
}
