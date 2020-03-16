const chalk = require('chalk')
const moment = require('moment')

exports.log = (content, type = 'log') => {
	const timestamp = `[${moment().format('YYYY-MM-DD HH:mm:ss')}]`
	const format = `${timestamp} [${type.toUpperCase()}]: ${content}`
	switch (type) {
		case 'log': {
			return console.log(chalk.white(format))
		}
		case 'warn': {
			return console.log(chalk.red(format))
		}
		case 'error': {
			return console.log(chalk.redBright(format))
		}
	}
}