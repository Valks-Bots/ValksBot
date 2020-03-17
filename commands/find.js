exports.run = async (client, message, args) => {
    if (args.length < 2)
        return message.channel.send(client.embed(message, {desc: 'Usage: \`find [emoji]\`'}))

    switch(args[0]) {
        case 'emoji': {
            const emoji = client.find(message, args, 'emoji')

            if (!emoji) {
                const msg = await client.embed.debug(message, 'Make sure you spelt the emoji correctly. The emoji has to be from the guild your executing the command in.')
                client.react.trash(client, message, msg)
            } else {
                const msg = await client.embed.send(message, {
                    desc: emoji.identifier,
                    thumbnail: emoji.url
                })
    
                client.reactDelete(message, msg)
            }

            return
        }
        case 'member': {
            const member = client.find(message, args, 'member')

            let roles = []
            member.roles.cache.forEach(role => {
                if (role.name !== '@everyone')
                    roles.push(`<@&${role.id}>`)
            })

            const msg = await message.channel.send(client.embed(message, {
                desc: `${member.id}`,
                fields: [
                {
                    name: 'Tag',
                    value: member.user.tag,
                    inline: true
                },
                {
                    name: 'Nickname',
                    value: member.nickname,
                    inline: true
                },
                {
                    name: 'Roles',
                    value: roles.join(' '),
                    inline: false
                }],
                thumbnail: member.user.avatarURL()
            }))

            client.reactDelete(message, msg)

            return
        }
    }
}

exports.conf = {
	enabled: true,
	aliases: ['f'],
	guildOnly: true,
	permLevel: 'User'
}

exports.help = {
	name: 'find'
}