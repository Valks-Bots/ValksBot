exports.create = (message, { title, desc, fields, thumbnail, image, color, files }) => {
  return {
    embed: {
      title: title,
      description: Array.isArray(desc) ? desc.join('\n') : desc,
      footer: {
        text: `${message.author.tag} (${message.author.id}) <${message.content.slice(0, 20)}${message.content.length > 20 ? '...' : ''}>`,
        icon_url: message.author.avatarURL()
      },
      thumbnail: {
        url: thumbnail
      },
      image: {
        url: image
      },
      color: color,
      timestamp: new Date(),
      fields: fields,
      files: files
    }
  }
}

exports.send = async (message, { title, desc, fields, thumbnail, image, color, files }, react = true) => {
  const m = await message.channel.send(this.create(message, { title, desc, fields, thumbnail, image, color, files }))
  if (react) await message.client.react.trash(message, m)
  return m
}

exports.edit = async (message, msg, { title, desc, fields, thumbnail, image, color, files }) => {
  const m = await msg.edit(this.create(message, { title, desc, fields, thumbnail, image, color, files }))
  await message.client.react.trash(message, m)
  return m
}

exports.debug = async (message, content) => {
  const m = await message.channel.send(this.create(message, {
    desc: `\`\`\`${content}\`\`\``
  }))
  await message.client.react.trash(message, m)
  return m
}

exports.error = async (message, error, content = '') => {
  const m = await message.channel.send(this.create(message, {
    desc: [content, '```js', `${error.name}: ${error.message}`, '```']
  }))
  await message.client.react.trash(message, m)
  return m
}
