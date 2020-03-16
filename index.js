if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.')

const Discord = require('discord.js')
const { promisify } = require('util')
const readdir = promisify(require('fs').readdir)
const sql = require('sqlite')
const client = new Discord.Client()

client.config = require('./config.js')
client.logger = require('./modules/Logger')
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

require('dotenv').config()
require('./modules/functions.js')(client)

const init = async () => {
	console.clear()
	client.logger.log(`Initializing..`)
	
	const cmdFiles = await readdir('./commands/')
	client.registerCommands(cmdFiles)
	
	const eventFiles = await readdir('./events/')
	client.registerEvents(eventFiles)
	
	require('axios').get('https://srhpyqt94yxb.statuspage.io/api/v2/status.json').then(({ data }) => client.logger.log(`Discord API Status: ${data.status.description}`))
	
	client.login(process.env.BOT_TOKEN)
}

init()