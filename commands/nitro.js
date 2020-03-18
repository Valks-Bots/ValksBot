exports.run = async (client, message, args) => {
    if (args.length < 1) {
        return client.embed.debug(message, client.commands.get('nitro').help.usage)
    }

    if (args[1] === undefined) {
        args[1] = 'message'
    }

    const emoji = client.find(message, args[0], 'emoji')

    switch (args[1]) {
        case 'message': {
            return message.channel.send(`<${emoji.identifier}>`)
        }
        case 'react': {
            return message.channel.messages.fetch({limit : 1, before : message.id}).then(messages => {
                const msg = messages.first()
                client.react.guild(message, msg, emoji.id)
            })
        }
    }
}

exports.conf = {
	enabled: true,
	aliases: ['nitr'],
	guildOnly: true,
	permLevel: 'User'
}

exports.help = {
    name: 'nitro',
    usage: '<emote> [message | react]'
}