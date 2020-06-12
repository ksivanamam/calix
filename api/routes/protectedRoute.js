// SECTION Dependencies
var express = require('../node_modules/express')
var router = express.Router()
var knex = require('./../knexReference')
// !SECTION

// SECTION Interfaces
// ANCHOR This handles all incoming GET-Requests for the user profil
router.get('/profil', async (req, res) => {
	try {
		var data = await knex('users').select(
			'userPK',
			'username',
			'email',
			'firstname',
			'lastname',
			'yearOfBirth',
			'height',
			'weight',
			'equipment',
			'color').where({
			userPK: req.decodedToken.userPK
		})
		res.send(data)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			notifyerOn: true,
			notifyerColor: 'error',
			notifyerMessage: 'Profil data cannot be loaded. Try again.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR This handles all incoming PUT-Requests for the user profil
router.put('/profil', async (req, res) => {
	try {
		var {
			email,
			yearOfBirth,
			height,
			weight,
			equipment,
			color
		} = req.body
		await knex('users').update({
			email: email,
			yearOfBirth: yearOfBirth,
			height: height,
			weight: weight,
			equipment: equipment,
			color: color
		}).where({
			userPK: req.decodedToken.userPK
		})
		var successMessage = {
			notifyerOn: true,
			notifyerColor: 'success',
			notifyerMessage: 'Profil data successfully changed.'
		}
		res.send(successMessage)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			notifyerOn: true,
			notifyerColor: 'error',
			notifyerMessage: 'Profil data cannot be loaded. Try again.'
		}
		res.send(errorMessage)
	}
})
// !SECTION

// SECTION Exports
module.exports = router
// !SECTION