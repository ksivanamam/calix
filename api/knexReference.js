var knex = require('./node_modules/knex')({
	client: 'sqlite3',
	connection: {
		filename: './../db/dev.sqlite3'
	}
})

module.exports = knex