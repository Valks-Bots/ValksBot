module.exports = async client => {
  client.logger.ready(`${client.user.username} is ready playing with ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`)

  client.database.run('CREATE TABLE IF NOT EXISTS settings (guildid TEXT UNIQUE, modrole TEXT, adminrole TEXT)').then(() => {
    for (const guild of client.guilds.cache.values()) {
      client.database.run('INSERT OR IGNORE INTO settings (guildid) VALUES (?)', [guild.id])
    }
  })
}
