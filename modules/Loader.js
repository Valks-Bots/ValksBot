const { promisify } = require('util')
const readdir = promisify(require('fs').readdir)

exports.registerModules = async (client) => {
  const moduleFiles = await readdir('./modules/')
  moduleFiles.forEach(file => {
    const moduleName = file.split('.')[0]
    if (moduleName[0] === moduleName[0].toLowerCase() || moduleName === 'Loader') { return }
    client[moduleName.toLowerCase()] = require('./' + moduleName)
  })
}

exports.registerCommands = async (client) => {
  const cmdFiles = await readdir('./commands/')
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`)

  cmdFiles.forEach(file => {
    const commandName = file.split('.')[0]
    const props = require(`../commands/${file}`)
    client.commands.set(props.help.name, props)
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name)
    })
    client.logger.log(`Registered Command: ${commandName}`)
  })
}

exports.registerEvents = async (client) => {
  const eventFiles = await readdir('./events/')
  client.logger.log(`Loading a total of ${eventFiles.length} events.`)

  eventFiles.forEach(file => {
    const eventName = file.split('.')[0]
    const evt = require(`../events/${file}`)
    client.on(eventName, evt.bind(null, client))
    client.logger.log(`Registered Event: ${eventName}`)
  })
}

exports.checkDiscordStatus = (client) => {
  require('axios').get(client.config.statusURL).then(({ data }) => client.logger.log(`Discord API Status: ${data.status.description}`))
}
