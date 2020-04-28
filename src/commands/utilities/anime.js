const dateFormat = require('dateformat')

exports.run = async (client, message, args) => {
  const msg = await client.embed.send(message, {
    desc: `<a:loading:691427407856402523> Searching Kitsu for '${args.join(' ')}', please be patient.`
  })

  const api = 'https://kitsu.io/api/edge'
  require('axios').get(`${api}/anime?filter[text]=${args.join(' ')}`).then(async (response) => {
    if (response.data.data.length === 0) {
      return client.embed.edit(message, msg, {
        desc: `Nothing was found for ${args.join(' ')}`
      })
    }

    const data = response.data.data[0]
    const attributes = data.attributes

    client.embed.edit(message, msg, {
      title: attributes.canonicalTitle,
      code: true,
      desc: attributes.synopsis,
      fields: [
        {
          name: 'Episodes',
          value: attributes.episodeCount
        },
        {
          name: 'Episode Length',
          value: attributes.episodeLength
        },
        {
          name: 'Next Release',
          value: attributes.nextRelease ? attributes.nextRelease : 'N/A'
        },
        {
          name: 'Started',
          value: dateFormat(attributes.startDate, 'mmm dS, yyyy')
        },
        {
          name: 'Ended',
          value: dateFormat(attributes.endDate, 'mmm dS, yyyy')
        },
        {
          name: 'Status',
          value: attributes.status
        },
        {
          name: 'Watch Count',
          value: attributes.userCount
        },
        {
          name: 'Favorite Count',
          value: attributes.favoritesCount
        },
        {
          name: 'Average Rating',
          value: `${attributes.averageRating} / 100`
        },
        {
          name: 'Popularity Rank',
          value: `#${attributes.popularityRank}`
        },
        {
          name: 'Rating Rank',
          value: `#${attributes.ratingRank}`
        },
        {
          name: 'Age Rating',
          value: attributes.ageRating
        }
      ],
      image: attributes.posterImage.large
    }).catch((error) => {
      console.log('Error: ' + error)
    })
  }).catch((error) => {
    if (error.response != undefined) {
      client.embed.edit(message, msg, {
        desc: error.response.status + ' ' + error.response.statusText
      })
    } else {
      client.embed.edit(message, msg, {
        desc: 'An unknown error occured.'
      })
      console.log(error)
    }
  })
}

exports.conf = {
  enabled: true,
  aliases: ['kanime'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'anime',
  usage: '',
  description: ''
}
