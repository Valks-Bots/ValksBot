const Embed = require('../classes/embed.js')

exports.run = async (client, message, args) => {
    if (args.length < 2)
        return message.channel.send(client.embed(message, {desc: 'Usage: \`find [emoji]\`'}))

    switch(args[0]) {
        case 'emoji': {
            const emoji = client.find(message, args, 'emoji')

            const embed = new Embed(message, {
                desc: emoji.identifier,
                thumbnail: emoji.url
            })

            const msg = await embed.send()
            console.log(msg.deleted)
            //await client.reactDelete(message, msg)

            return
        }
        case 'member': {
            const member = client.find(message, args, 'member')

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