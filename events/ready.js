module.exports = async client => {
	client.logger.log(`Playing with ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`)
}