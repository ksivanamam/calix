var express = require('../node_modules/express')
var knex = require('./../knexReference')
var router = express.Router()

router.get('/exercises', async (req, res) => {

	try {

		var data = await knex('users')
		res.send(data)

	} catch (error) {
		
		console.log(error);
		
	}
	
})

module.exports = router