module.exports = async (client, message) => {
  if (message.author.bot) return

  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`)
  if (message.content.match(prefixMention)) {
    return client.embed.send(message, {
      title: `${client.user.username} Bot`,
      desc: ['This bot was designed to make your life easier on several different levels!', '', `Get started with \`${client.config.prefix}help\``],
      thumbnail: client.user.avatarURL(),
      fields: [{
        name: 'Library',
        value: 'discord.js',
        inline: true
      },
      {
        name: 'Prefix',
        value: client.config.prefix,
        inline: true
      },
      {
        name: 'Author',
        value: client.users.cache.get(client.config.ownerID).tag,
        inline: true
      },
      {
        name: 'Support',
        value: '[Official Server](https://discord.gg/thMupbv)',
        inline: true
      },
      {
        name: 'Invite',
        value: `[Add ${client.user.username}](https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`,
        inline: true
      },
      {
        name: 'Donate',
        value: '[PayPal](https://www.paypal.com/paypalme2/valkyrienyanko)',
        inline: true
      }]
    })
  }

  if (!message.content.startsWith(client.config.prefix)) return

  const command = message.content.split(' ')[0].slice(client.config.prefix.length)
  const args = message.content.split(' ').slice(1)
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

  // Is this a valid command?
  if (!cmd || command === '') return

  // Delete the executors message.
  if (client.config.deleteCommands && !message.deleted) message.delete()

  // Is the command only available in guilds?
  if (!message.guild && cmd.conf.guildOnly) return client.embed.send(message, { desc: 'This command is unavailable via private messages. Please run this command in a guild.' })

  // Is the bot currently under going maintenence?
  if (client.config.botMaintenance && message.author.id != client.config.ownerID) return client.embed.send(message, {desc: 'The bot can currently only be run by the bot owner. Sorry for the inconvience.'})

  client.permLevel(client, message).then(permLevel => {
    if (permLevel >= client.levelCache[cmd.conf.permLevel]) {
      const guildName = message.guild.name.replace(/[^a-zA-Z ]/g, '').trim()
      client.logger.cmd(`${guildName}: ${message.author.tag}: '${message.content}'`)
      cmd.run(client, message, args)
    } else {
      client.embed.send(message, {
        code: true,
        desc: 'You do not have permission to run this command.',
        fields: [
          {
            name: 'Have',
            value: client.config.permLevels.find(l => l.level === permLevel).name
          }, 
          {
            name: 'Required',
            value: cmd.conf.permLevel
          }
        ]
      })
    }
  }).catch((e) => {
    client.embed.debug(message, `Tell ${message.guild.owner.tag} to assign a role for ${client.config.permLevels.find(l => l.level === e).name} in the settings.`)
  })
}
