exports.run = async (client, message, args) => {
    if (args.length < 2)
        return message.channel.send(client.embed(message, {desc: 'Usage: \`find [emoji]\`'}))

    switch(args[0]) {
        case 'emoji': {
            const emoji = message.guild.emojis.cache.find(emoji => emoji.name === args[1])

            if (!emoji)
                return message.channel.send(client.embed(message, {
                    desc: `Could not find emoji ${args[1]}.`
                }))

            const msg = await message.channel.send(client.embed(message, {
                desc: emoji.identifier,
                thumbnail: emoji.url
            }))

            client.reactDelete(message, msg)

            return
        }
        case 'member': {
            const member = message.guild.members.cache.find(member => [member.displayName, member.id].includes(args.slice(1).join(' ')))

            if (!member)
                return message.channel.send(client.embed(message, {
                    desc: `Could not find member ${args[1]}.`
                }))

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