exports.normal = () => {

}

exports.custom = (client, message, emojiID) => {
    message.react(client.guilds.cache.get(client.config.botGuildID).emojis.cache.get(emojiID)).catch(console.error)
}

exports.trash = (client, message, msg) => {
    const emoteDelete = client.config.emojis.delete
    this.custom(client, msg, emoteDelete)

    const filter = (reaction, user) => {
        return reaction.emoji.id === emoteDelete && user.id === message.author.id
    }

    const collector = msg.createReactionCollector(filter, { time: client.config.deleteTime });
    collector.on('collect', (reaction, reactionCollector) => {
        if (!message.deleted)
            message.delete()
        if (!msg.deleted)
            msg.delete()
    })
    collector.on('end', (reaction, reactionCollector) => {
        if (!msg.deleted)
            msg.reactions.removeAll()
    })
}