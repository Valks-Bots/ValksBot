module.exports = (client) => {
  client.find = (message, args, type = 'member') => {
    const guilds = client.guilds.cache
    const guild = message.guild
    const params = Array.isArray(args) ? args.slice(1).join(' ').toLowerCase() : args.toLowerCase()

    if (type === 'member') {
      return guild.members.cache.find(member => [member.id, member.displayName.toLowerCase()].includes(params))
    }

    if (type === 'role') {
      return guild.roles.cache.find(role => [role.id, role.name.toLowerCase()].includes(params))
    }

    if (type === 'emoji') {
      for (const guild of guilds.keyArray()) {
        const emote = client.guilds.cache.get(guild).emojis.cache.find(emoji => [emoji.id, emoji.name.toLowerCase()].includes(params))
        if (emote) { return emote }
      }
    }
  }

  client.permLevel = async (client, message) => {
    const permLevels = client.config.permLevels.sort((a, b) => b.level - a.level)
    return new Promise(async (resolve, reject) => {
      for (const permLevel of permLevels) {
        await permLevel.check(client, message).then(check => {
          if (check) {
            resolve(permLevel.level)
          }
        }).catch((e) => {
          reject(permLevel.level)
        })
      }
    })
  }

  client.customReact = (message, emojiID) => {
    message.react(client.guilds.cache.get(client.config.botGuildID).emojis.cache.get(emojiID)).catch(console.error)
  }

  client.reactDelete = async (message, msg) => {
    const emoteDelete = client.config.emojis.delete
    await client.customReact(msg, emoteDelete)

    const filter = (reaction, user) => {
      return reaction.emoji.id === emoteDelete && user.id === message.author.id
    }

    const collector = msg.createReactionCollector(filter, { time: client.config.deleteTime })
    collector.on('collect', (reaction, reactionCollector) => {
      if (!message.deleted) { message.delete() }
      if (!msg.deleted) { msg.delete() }
    })
    collector.on('end', (reaction, reactionCollector) => {
      msg.reactions.removeAll().catch()
    })
  }
}
