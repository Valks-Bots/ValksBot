exports.normal = () => {

}

exports.custom = (client, msg, emojiID) => {
    msg.react(client.guilds.cache.get(client.config.botGuildID).emojis.cache.get(emojiID)).catch(console.error)
}

exports.guild = (message, msg, emojiID) => {
    msg.react(message.guild.emojis.cache.get(emojiID))
}

exports.trash = (client, message, msg) => {
    console.log(message.content)
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
        
        collector.stop()
    })
    collector.on('end', (reaction, reactionCollector) => {
        if (!msg.deleted)
            msg.reactions.removeAll()
    })
}