exports.run = async (client, message, args) => {
    if (args.length < 1){
        return client.embed.debug(message, 'modrole adminrole')
    }

    if (args.length < 2) {
        if (args[0] === 'modrole') {
            return client.settings.display(client, message, 'modrole')
        }

        if (args[0] === 'adminrole') {
            return client.settings.display(client, message, 'adminrole')
        }
    }

    if (args[0] === 'modrole') {
        const role = client.find(message, args[1], 'role')
        if (!role) return client.embed.debug(message, 'Invalid role')
        return client.settings.update(client, message, 'modrole', role.id)
    }

    if (args[0] === 'adminrole') {
        const role = client.find(message, args[1], 'role')
        if (!role) return client.embed.debug(message, 'Invalid role')
        return client.settings.update(client, message, 'adminrole', role.id)
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
  usage: '[option] [value]',
  description: 'Change per guild settings.'
}
