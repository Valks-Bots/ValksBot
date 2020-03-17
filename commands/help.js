exports.run = async (client, message, args) => {
    message.channel.send(client.embed(message, {
        desc: `wip`
    }))
}

exports.conf = {
	enabled: true,
	aliases: ['f'],
	guildOnly: false,
	permLevel: 'User'
}

exports.help = {
	name: 'help'
}