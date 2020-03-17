module.exports = (client) => {
	const defaultSettings = {
		'prefix': 'v!'
	}
	
	client.registerCommands = async () => {
		const cmdFiles = await readdir('./commands/')
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

	client.find = (message, args, type = 'member') => {
		const guild = message.guild

		switch (type) {
			case 'member': {
				return guild.members.cache.find(member => [member.displayName, member.id].includes(Array.isArray(args) ? args.slice(1).join(' ') : args))
			}
			case 'emoji': {
				return guild.emojis.cache.find(emoji => [emoji.name, emoji.id].includes(Array.isArray(args) ? args.slice(1).join(' '): args))
			}
		}
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