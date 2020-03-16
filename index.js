const Discord = require('discord.js')
const client = new Discord.Client()
require('dotenv').config()

client.config = require('./config.js')
client.logger = require('./modules/Logger')

require('./modules/functions.js')(client)

const init = async () => {
	client.login(process.env.BOT_TOKEN)
}

init()