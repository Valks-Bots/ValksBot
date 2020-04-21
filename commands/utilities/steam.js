//
const axios = require('axios')

exports.run = async (client, message, args) => {
    const msg = await client.embed.send(message, {
        desc: `<a:loading:691427407856402523> Searching Steam for '${args.join(' ')}', please be patient.`
    })

    const api = `http://api.steampowered.com`

    axios.get(`${api}/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_TOKEN}&input_json={"personaname":${args.join(' ')}}`).then(data => {
      console.log(data)
    })

    /*require('axios').get(`${api}/ResolveVanityURL/v0001/?key=${process.env.STEAM_TOKEN}&vanityurl=${args.join(' ')}`).then(async (response) => {
        console.log(response)
    })*/

    //http://api.steampowered.com
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
