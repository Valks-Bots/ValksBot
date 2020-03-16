module.exports = (client) => {
	const defaultSettings = {
		'prefix': 'v!'
	}
	
	client.registerCommands = (cmdFiles) => {
		client.logger.log(`Loading a total of ${cmdFiles.length} commands.`)
		
		cmdFiles.forEach(file => {
			const commandName = file.split('.')[0]
			const props = require(`../commands/${file}`)
			client.commands.set(props.help.name, cmdFiles)
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
	
	client.embed = ({msg, title, desc, fields, thumbnail, image}) => {
		msg.channel.send('', {
			embed: {
				title: title,
				description: desc.join('\n'),
				footer: {
					text: `Executor: ${msg.author.tag} (${msg.author.id})`,
					icon_url: msg.author.avatarURL()
				},
				thumbnail: {
					url: thumbnail
				},
				image: {
					url: image
				},
				timestamp: new Date(),
				fields: fields
			}
		})
	}
}