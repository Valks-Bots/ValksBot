if (Number(process.version.slice(1).split('.')[0]) < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.')

const Discord = require('discord.js')

const client = new Discord.Client()

client.database = require('sqlite')
client.config = require('./config.js')
client.loader = require('./modules/Loader')

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.levelCache = {}
for (const permLevel of client.config.permLevels) {
  client.levelCache[permLevel.name] = permLevel.level
}

client.cooldowns = {}

require('dotenv').config()
require('./modules/functions.js')(client)

client.database.open('./database.db')

const init = async () => {
  console.clear()
  const loader = await client.loader
  await loader.registerModules(client)
  await loader.registerCommands(client)
  await loader.registerEvents(client)
  await loader.checkDiscordStatus(client)
  await client.login(process.env.BOT_TOKEN)
}

init()
