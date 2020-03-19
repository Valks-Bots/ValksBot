module.exports = async client => {
  client.logger.ready(`${client.user.username} is ready playing with ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`)
}
