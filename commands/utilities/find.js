exports.run = async (client, message, args) => {
  if (args.length < 2) return client.embed.debug(message, client.commands.get('find').help.usage)

  if (args[0] === 'emoji') {
    const emoji = client.find(message, args, 'emoji')

    if (!emoji) return client.embed.debug(message, 'Make sure you spelt the emoji correctly. Also case senistive!')

    client.embed.send(message, {
      desc: emoji.identifier,
      thumbnail: emoji.url
    })
  }

  if (args[0] === 'member') {
    const member = client.find(message, args, 'member')

    if (!member) return client.embed.debug(message, 'Case sensitive!')

    const roles = []
    member.roles.cache.forEach(role => {
      if (role.name === '@everyone' || role.hexColor === '#2f3136') { return }

      roles.push(`<@&${role.id}>`)
    })

    await client.embed.send(message, {
      desc: `${member.id}`,
      fields: [
        {
          name: 'Tag',
          value: member.user.tag,
          inline: true
        },
        {
          name: 'Nickname',
          value: member.nickname === undefined ? 'No nickname' : member.nickname,
          inline: true
        },
        {
          name: 'Roles',
          value: roles.length === 0 ? 'No roles' : roles.join(' '),
          inline: false
        }],
      thumbnail: member.user.avatarURL()
    })
  }
}

exports.conf = {
  enabled: true,
  aliases: ['f'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'find',
  usage: '<[emoji | member]> <args>',
  description: ''
}
