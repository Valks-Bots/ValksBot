exports.run = async (client, message, args) => {
	let cmds = []
	
	client.commands.forEach(cmd => {
		cmds.push(`${client.config.prefix}${cmd.help.name} [${cmd.conf.aliases.join(', ')}]`)
	})

    const msg = await client.embed.debug(message, cmds.join('\n'))
}

exports.conf = {
	enabled: true,
	aliases: ['h'],
	guildOnly: false,
	permLevel: 'User'
}

exports.help = {
	name: 'help'
}