const prettyMS = require('pretty-ms')

exports.run = async (client, message, args) => {
  const member = client.find(message, args[0], 'member')
  if (!member) return client.embed.debug(message, 'Could not find member.')

  const memberAge = prettyMS(Date.now() - member.joinedAt.getTime(), { verbose: true, unitCount: 3 })
  const accountAge = prettyMS(Date.now() - member.user.createdAt.getTime(), { verbose: true, unitCount: 3 })

  member.kick(args.length >= 2 ? args.slice(1).join(' ') : 'No reason specified.').then(m => {
    client.embed.send(message, {
      code: true,
      desc: `\`\`\`Kicked ${m.user.tag} (${m.id})\`\`\``,
      fields: [
        {
          name: 'ID',
          value: m.id
        },
        {
          name: 'Account Age',
          value: accountAge
        },
        {
          name: 'Memeber Age',
          value: memberAge
        }
      ]
    })
  }).catch((err) => {
    client.embed.debug(message, err)
  })
}

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: true,
  permLevel: 'Moderator'
}

exports.help = {
  name: 'kick',
  usage: '<user>',
  description: 'Kick a user.'
}
