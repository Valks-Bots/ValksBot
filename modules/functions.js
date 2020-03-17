module.exports = (client) => {
	const defaultSettings = {
		'prefix': 'v!'
	}
	
	client.registerCommands = (cmdFiles) => {
		client.logger.log(`Loading a total of ${cmdFiles.length} commands.`)
		
		cmdFiles.forEach(file => {
			const commandName = file.split('.')[0]
			const props = require(`../commands/${file}`)
			client.commands.set(props.help.name, props)
			props.conf.aliases.forEach(alias => {
				client.aliases.set(alias, props.help.name)
			})
			client.logger.log(`Registered Command: ${commandName}`)
		})
	}
	
	client.registerEvents = (eventFiles) => {
		client.logger.log(`Loading a total of ${eventFiles.length} events.`)
		
		eventFiles.forEach(file => {
			const eventName = file.split('.')[0]
			const evt = require(`../events/${file}`)
			client.on(eventName, evt.bind(null, client))
			client.logger.log(`Registered Event: ${eventName}`)
		})
	}
	
	client.embed = (message, {title, desc, fields, thumbnail, image, color}) => {
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

	client.customReact = (message, emojiID) => {
		message.react(client.guilds.cache.get(client.config.botGuildID).emojis.cache.get(emojiID))
	}

	client.reactDelete = async (message, msg) => {
		const emoteDelete = client.config.emojis.delete
		await client.customReact(msg, emoteDelete)

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
}