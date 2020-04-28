exports.updateGuild = (client, message, guildid) => {
  client.database.get('SELECT COUNT(1) FROM modmail').then(count => {
    if (count['COUNT(1)'] === 0) {
      client.database.run('INSERT OR IGNORE INTO modmail (guildid) VALUES (?)', [guildid])
    } else {
      client.database.run('UPDATE modmail SET guildid = ? WHERE guildid = ?', [guildid])
    }

    // client.cache.modmail.set('guildid', guildid)
    client.cache.get().then(data => {
      data.guildid = guildid
      console.log(data)
    })

    client.embed.send(message, {
      desc: 'Updated guildid.'
    })
  })
}

exports.updateCategory = (client, message, guildid, categoryid) => {
  client.database.get('SELECT COUNT(1) FROM modmail').then(count => {
    if (count['COUNT(1)'] === 0) {
      client.embed.send(message, {
        desc: 'Please set the guildid first.'
      })
    } else {
      client.database.run('UPDATE modmail SET category = ? WHERE guildid = ?', [categoryid, guildid])

      client.embed.send(message, {
        desc: 'Updated category.'
      })

      client.cache.modmail.set('categoryid', categoryid)
    }
  })
}
