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

exports.send = (message, {title, desc, fields, thumbnail, image, color}) => {
    return message.channel.send(this.create(message, { title, desc, fields, thumbnail, image, color }))
}

exports.edit = (message, {title, desc, fields, thumbnail, image, color}) => {
    return message.edit(this.create(message, { title, desc, fields, thumbnail, image, color }))
}

exports.debug = (message, content) => {
    return message.channel.send(this.create(message, {
        desc: `\`\`\`${content}\`\`\``
    }))
}

exports.error = (message, error, content = '') => {
    return message.channel.send(this.create(message, {
        desc: [content, `\`\`\`js`, `${error.name}: ${error.message}`, `\`\`\``]
    }))
}