exports.run = async (client, message, args) => {
    if (args.length === 0){
        const fields = ['modrole', 'adminrole', 'modmail_guild', 'modmail_category']

        let embedFields = []
        for (const field of fields) {
            await client.settings.get(client, message, field).then(async value => {
                await embedFields.push({
                    name: field.toUpperCase(),
                    value: value
                })
            })
        }

        return await client.embed.send(message, {
            code: true,
            title: 'Settings',
            fields: embedFields
        })
    }

    if (args.length <= 1) {
        await client.settings.get(client, message, args[0]).then(value => {
            client.embed.send(message, {
                desc: value
            })
        })

        return
    }

    if (args[0] === 'modrole' || args[0] === 'adminrole') {
        const role = client.find(message, args[1], 'role')
        if (!role) return client.embed.debug(message, `Could not find the role '${args[1]}'`)
        return client.settings.set(client, message, args[0], role.id)
    }

    if (args[0] === 'modmail_guild') {
        if (message.author.id != client.config.ownerID) return client.embed.send(message, {desc: `You need to be the bot owner to update the 'modmail_guild' field.`})
        const guild = client.find(message, args[1], 'guild')
        if (!guild) return client.embed.send(message, {desc: `Could not find guild called '${args[1]}'`})
        return client.settings.set(client, message, args[0], guild.id)
    }

    if (args[0] === 'modmail_category') {
        if (message.author.id != client.config.ownerID) return client.embed.send(message, {desc: `You need to be the bot owner to update the 'modmail_category' field.`})
        const channel = client.find(message, args[1], 'channel')
        if (!channel) return client.embed.send(message, {desc: `Could not find channel called '${args[1]}'`})
        if (channel.type != 'category') return client.embed.send(message, {desc: `Channel must be of type 'category'.`})
        return client.settings.set(client, message, args[0], channel.id)
    }
}

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: true,
  permLevel: 'Administrator'
}

exports.help = {
  name: 'settings',
  usage: '[field] [value]',
  description: 'Change or view fields in per guild settings.'
}
