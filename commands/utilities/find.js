const prettyMS = require('pretty-ms')
const dateFormat = require('dateformat')

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

    let roles = []
    member.roles.cache.forEach(role => {
      if (role.name === '@everyone' || role.hexColor === '#2f3136') return
      roles.push(role.name)
    })

    const joinedServerAt = dateFormat(member.joinedAt, 'mmm dS, yyyy, h:MM TT')
    const memberAge = prettyMS(Date.now() - member.joinedAt.getTime(), { verbose: true, unitCount: 3 })
    const accountAge = prettyMS(Date.now() - member.user.createdAt.getTime(), { verbose: true, unitCount: 3 })

    const lastMessageContent = member.lastMessage === null ? 'Could not find last sent message.' : `[${member.lastMessage.content}](https://discordapp.com/channels/${member.guild.id}/${member.lastMessageChannelID}/${member.lastMessageID})`

    await client.embed.send(message, {
      code: true,
      inline: false,
      fields: [
        {
          name: 'Tag',
          value: member.user.tag,
          inline: true,
        },
        {
          name: 'Nickname',
          value: member.nickname === null ? 'No nickname' : member.nickname,
          inline: true,
        },
        {
          name: 'ID',
          value: member.id,
          inline: true
        },
        {
          name: 'Account Age',
          value: accountAge,
          inline: true
        },
        {
          name: 'Member Age',
          value: joinedServerAt,
          inline: true
        },
        {
          name: 'Member Age',
          value: memberAge,
          inline: true
        },
        {
          name: 'Last Message',
          value: lastMessageContent,
          inline: false,
          code: false
        },
        {
          name: 'Permissions',
          value: member.permissions.toArray().slice(0, -1).join(', '),
          inline: false,
          code: true
        },
        {
          name: 'Roles',
          value: roles.length === 0 ? 'No roles' : roles.slice(0, -1).join(', '),
          inline: false
        }],
      image: member.user.avatarURL()
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
