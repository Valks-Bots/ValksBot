module.exports = async guild => {
  client.logger.log(`I have joined the guild '${guild.name}'`)

  client.database.run('INSERT OR IGNORE INTO settings (guildid) VALUES (?)', [guild.id])
}
