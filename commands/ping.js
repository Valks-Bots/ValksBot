exports.run = async (client, message, args) => {
	const msg = await message.channel.send(client.embed(message, {desc: ['Ping?']}))
	await msg.edit(client.embed(message, {desc:`<:kittywow:521494525571629076> Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`}))
	await client.reactDelete(message, msg)
}

exports.conf = {
	enabled: true,
	aliases: ['p'],
	guildOnly: false,
	permLevel: 'User'
}

exports.help = {
	name: 'ping'
}