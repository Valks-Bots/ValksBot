module.exports = async client => {
  client.logger.ready(`${client.user.username} is ready playing with ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`)

  // Settings
  await client.database.run('CREATE TABLE IF NOT EXISTS settings (guildid TEXT UNIQUE, modrole TEXT, adminrole TEXT, modmail_guild TEXT, modmail_category TEXT)')

  for (const guild of client.guilds.cache.values()) {
    await client.database.run('INSERT OR IGNORE INTO settings (guildid) VALUES (?)', [guild.id])
  }

  const table = await client.database.all('SELECT * FROM settings')
  client.cache.data.guilds = table

  // ModMail
  await client.database.run('CREATE TABLE IF NOT EXISTS modmail (guildid TEXT UNIQUE, category TEXT)')

  const modmail = await client.database.get('SELECT * FROM modmail')
  client.cache.data['modmail'] = modmail

  client.cache.save()
}