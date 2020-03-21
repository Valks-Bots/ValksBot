exports.run = async (client, message, args) => {
  if (args.length < 1) {
    const cmds = []
    client.commands.forEach(cmd => {
      cmds.push(`${client.config.prefix}${cmd.help.name} [${cmd.conf.aliases.join(', ')}]`)
    })
    client.embed.debug(message, cmds.join('\n'))
  } else {
    const cmd = client.commands.get(args[0])
    if (cmd) {
      let name = cmd.help.name
      if (name === undefined || name === '') { name = 'No name set.' }

      let description = cmd.help.description
      if (description === undefined || description === '') { description = 'No description has been set for this command.' }

      let usage = cmd.help.usage
      if (usage === undefined || usage === '') { usage = `${client.config.prefix}${args[0]}` } else { usage = `${client.config.prefix}${args[0]} ${cmd.help.usage}` }

      let aliases = cmd.conf.aliases
      if (aliases === undefined || aliases === '') { aliases = '[]' } else { aliases = `[${cmd.conf.aliases.join(' ')}]` }

      let permLevel = cmd.conf.permLevel
      if (permLevel === undefined || permLevel === '') { permLevel = 'No perm lvl set.' }

      let guildOnly = cmd.conf.guildOnly
      if (guildOnly === undefined || guildOnly === '') { guildOnly = 'No value set.' }

      let enabled = cmd.conf.enabled
      if (enabled === undefined || enabled === '') { enabled = 'No value set.' }

      client.embed.send(message, {
        desc: description,
        fields: [
          {
            name: 'Name',
            value: `\`${name}\``,
            inline: true
          },
          {
            name: 'Usage',
            value: `\`${usage}\``,
            inline: true
          },
          {
            name: 'Aliases',
            value: `\`${aliases}\``,
            inline: true
          },
          {
            name: 'Perm Level',
            value: `\`${permLevel}\``,
            inline: true
          },
          {
            name: 'Guild Only',
            value: `\`${guildOnly}\``,
            inline: true
          },
          {
            name: 'Enabled',
            value: `\`${enabled}\``,
            inline: true
          }
        ]
      })
    }
  }
}

exports.conf = {
  enabled: true,
  aliases: ['h'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'help',
  usage: '[command]',
  description: 'Displays commands and help on specific commands.'
}
