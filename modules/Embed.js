exports.create = (message, {title, desc, fields, thumbnail, image, color}) => {
    return {
        embed: {
            title: title,
            description: Array.isArray(desc) ? desc.join('\n') : desc,
            footer: {
                text: `Executor: ${message.author.tag} (${message.author.id})`,
                icon_url: message.author.avatarURL()
            },
            thumbnail: {
                url: thumbnail
            },
            image: {
                url: image
            },
            color: color,
            timestamp: new Date(),
            fields: fields
        }
    }
}

exports.send = async (message, {title, desc, fields, thumbnail, image, color}, react = true) => {
    const m = await message.channel.send(this.create(message, { title, desc, fields, thumbnail, image, color }))
    await react ? message.client.react.trash(message, m) : null
    return m
}

exports.edit = async (message, msg, {title, desc, fields, thumbnail, image, color}) => {
    const m = await msg.edit(this.create(msg, { title, desc, fields, thumbnail, image, color }))
    await message.client.react.trash(message, m)
    return m
}

exports.debug = async (message, content) => {
    const m = await message.channel.send(this.create(message, {
        desc: `\`\`\`${content}\`\`\``
    }))
    await message.client.react.trash(message, m)
    return m
}

exports.error = async (message, error, content = '') => {
    const m = await message.channel.send(this.create(message, {
        desc: [content, `\`\`\`js`, `${error.name}: ${error.message}`, `\`\`\``]
    }))
    await message.client.react.trash(message, m)
    return m
}