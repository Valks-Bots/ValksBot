exports.getAll = (client, message) => {
    return new Promise((resolve, reject) => {
        client.database.get(`SELECT * FROM settings WHERE guildid = ?`, [message.guild.id]).then(row => {
            resolve(row) 
        })
    })
}

exports.get = (client, message, field) => {
    return new Promise((resolve, reject) => {
        client.database.get(`SELECT * FROM settings WHERE guildid = ?`, [message.guild.id]).then(row => {
            resolve(row[field]) 
        })
    })
}

exports.set = (client, message, field, value) => {
    client.database.get(`SELECT * FROM settings WHERE guildid = ?`, [message.guild.id]).then(old => {
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