exports.normal = () => {

}

exports.custom = (client, msg, emojiID) => {
  msg.react(client.guilds.cache.get(client.config.botGuildID).emojis.cache.get(emojiID)).catch(console.error)
}

exports.guild = (message, msg, emojiID) => {
  msg.react(message.guild.emojis.cache.get(emojiID))
}

exports.trash = (message, msg) => {
  const client = message.client
  const emoteDelete = client.config.emojis.delete

  this.custom(client, msg, emoteDelete)

  const filter = (reaction, user) => {
    return reaction.emoji.id === emoteDelete && user.id === message.author.id
  }

  const collector = msg.createReactionCollector(filter, { time: client.config.deleteTime })
  collector.on('collect', () => {
    if (!message.deleted) { message.delete().catch(console.error) }
    if (!msg.deleted) { msg.delete().catch(console.error) }

    collector.stop()
  })
  
  collector.on('end', () => {
    if (!msg.deleted) { msg.reactions.removeAll().catch(console.error) }
  })
}
