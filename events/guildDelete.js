module.exports = async guild => {
    client.logger.log(`I have left guild '${guild.name}'`)

    client.database.run('DELETE * FROM settings WHERE guildid = ?', [guild.id])
}