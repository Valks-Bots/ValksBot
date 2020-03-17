module.exports = async (client, message) => {
	if (message.author.bot) return

	const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`)
	if (message.content.match(prefixMention)) {
		return message.channel.send(client.embed(message, {
			title: `${client.user.username} Bot`,
			desc: [`This bot was designed to make your life easier on several different levels!`, ``, `Get started with \`${client.config.prefix}help\``],
			thumbnail: client.user.avatarURL(),
			fields: [{
				name: 'Library',
				value: 'discord.js',
				inline: true
			},
			{
				name: 'Prefix',
				value: client.config.prefix,
				inline: true
			},
			{
				name: 'Author',
				value: client.users.cache.get(client.config.ownerID).tag,
				inline: true
			},
			{
				name: 'Support',
				value: '[Official Server](https://discord.gg/thMupbv)',
				inline: true
			},
			{
				name: 'Invite',
				value: `[Add ${client.user.username}](https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`,
				inline: true
			},
			{
				name: 'Donate',
				value: '[PayPal](https://www.paypal.com/paypalme2/valkyrienyanko)',
				inline: true
			}]
		}))
	}
	
	if (!message.content.startsWith(client.config.prefix)) return
	
	const command = message.content.split(' ')[0].slice(client.config.prefix.length)
	const args = message.content.split(' ').slice(1)
	const cmd = client.commands.get(command)
	
	if (!cmd) return
	
	if (cmd && !message.guild && cmd.conf.guildOnly)
		return msg.channel.send(client.embed(message, {desc: 'This command is unavailable via private messages. Please run this command in a guild.'}))
	
	client.logger.cmd(command)

	cmd.run(client, message, args)

	if (!message.deleted)
		message.delete()
}