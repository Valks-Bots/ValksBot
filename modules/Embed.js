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
    const msg = await message.channel.send(this.create(message, { title, desc, fields, thumbnail, image, color }))
    await react ? message.client.react.trash(message.client, message, msg) : null
    return msg
}

exports.edit = async (message, {title, desc, fields, thumbnail, image, color}) => {
    message.edit(this.create(message, { title, desc, fields, thumbnail, image, color })).then(msg => {
        msg.client.react.trash(msg.client, msg, msg)
        return msg
    })
}

exports.debug = async (message, content) => {
    const msg = await message.channel.send(this.create(message, {
        desc: `\`\`\`${content}\`\`\``
    }))
    await message.client.react.trash(message.client, message, msg)
    return msg
}

exports.error = async (message, error, content = '') => {
    const msg = message.channel.send(this.create(message, {
        desc: [content, `\`\`\`js`, `${error.name}: ${error.message}`, `\`\`\``]
    }))
    await message.client.react.trash(message.client, message, msg)
    return msg
}