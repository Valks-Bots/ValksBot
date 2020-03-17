class Embed {
    constructor(message, {title, desc, fields, thumbnail, image, color}) {
        this.message = message
        this.embed = {
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

    send() {
        return this.message.channel.send(this.embed)
    }

    edit(embed) {
        this.message.channel.edit(embed)
    }
}

module.exports = Embed