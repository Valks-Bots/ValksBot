//
exports.run = async (client, message, args) => {
    /*const msg = await client.embed.send(message, {
        desc: `<a:loading:691427407856402523> Searching Steam for '${args.join(' ')}', please be patient.`
    })

    const api = `http://api.steampowered.com`
    require('axios').get(`${api}/ResolveVanityURL/v0001/?key=${process.env.STEAM_TOKEN}&vanityurl=${args.join(' ')}`).then(async (response) => {
        console.log(response)
    })*/
}

exports.conf = {
  enabled: false,
  aliases: [],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'steam',
  usage: '',
  description: 'Fetch steam stuff.'
}
