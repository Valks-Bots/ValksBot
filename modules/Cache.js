const fs = require('fs')

exports.data = {
    guilds: []
}

exports.save = () => {
    fs.writeFileSync('cache.json', JSON.stringify(this.data, null, 2))
}

exports.fetch = () => {
    return JSON.parse(fs.readFileSync('cache.json', 'utf8'))
}

exports.exists = () => {
    try {
        fs.accessSync('cache.json')
        return true
    } catch (err) {
        return false
    }
}

exports.init = () => {
    if (this.exists()) {
        this.data = this.fetch()
      } else {
        this.save()
      }
}