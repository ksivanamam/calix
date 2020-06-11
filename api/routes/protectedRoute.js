var express = require('../node_modules/express')
var router = express.Router()
var knex = require('./../knexReference')

router.get('/profil', async (req, res) => {

	try {
		var data = await knex('users').where({
			userPK: req.decodedToken.id
		})
		res.send(data)

	} catch (error) {

		console.error(error.message);

	}
	
})

module.exports = router