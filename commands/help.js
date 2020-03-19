exports.run = async (client, message, args) => {
  const cmds = []

  client.commands.forEach(cmd => {
    cmds.push(`${client.config.prefix}${cmd.help.name} [${cmd.conf.aliases.join(', ')}]`)
  })

  client.embed.debug(message, cmds.join('\n'))
}

exports.conf = {
  enabled: true,
  aliases: ['h'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'help'
}
