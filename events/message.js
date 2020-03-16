module.exports = async (client, message) => {
	if (message.author.bot) return

	const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`)
	if (message.content.match(prefixMention)) {
		return client.embed({
			title: `${client.user.username} Bot`,
			desc: [`This bot was designed to make your life easier on several different levels!`, ``, `Get started with \`${client.config.prefix}help\``],
			msg: message,
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
		})
	}
	
	if (!message.content.startsWith(client.config.prefix)) return
	
	console.log('test')
	
	const args = message.content.slice(settings.prefix.length).trim().split(/ +/g)
	const command = args.shift().toLowerCase()
	
	const cmd = client.commands.get(command)
	
	if (!cmd) return
	
	if (cmd && !message.guild && cmd.conf.guildOnly)
		return client.embed({desc: 'This command is unavailable via private messages. Please run this command in a guild.'})
	
	client.logger.log('command')
	cmd.run(client, message, args)
}