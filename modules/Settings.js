exports.display = (client, message, field) => {
    // Note that users do not have direct access to modifying query.
    client.database.get(`SELECT ${field} FROM settings WHERE guildid = ?`, [message.guild.id]).then(row => {
        return client.embed.debug(message, row[field])
    })
}

exports.update = (client, message, field, value) => {
    // Note that users do not have direct access to modifying query.
    client.database.get(`SELECT ${field} FROM settings WHERE guildid = ?`, [message.guild.id]).then(old => {
        client.database.run(`UPDATE settings SET ${field} = ? WHERE guildid = ?`, [value, message.guild.id])
        client.embed.send(message, {
            code: 'js',
            fields: [
                {
                    name: 'Old Value',
                    value: old[field]
                },
                {
                    name: 'New Value',
                    value: value
                }
            ]
        })
    })
}