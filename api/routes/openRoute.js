// SECTION Dependencies
var express = require('./../node_modules/express')
var bcrypt = require('./../node_modules/bcryptjs')
var knex = require('./../knexReference.js')
var jwt = require('./../node_modules/jsonwebtoken')
var router = express.Router()
require('dotenv').config()
// !SECTION

// SECTION Interfaces
// ANCHOR THis interface will handle incoming register POST-Requests
router.post('/register', async (req, res) => {
	try {

		var {
			username,
			password,
			email,
			firstname,
			lastname,
			age,
			height,
			weight,
			equipment,
			color
		} = req.body

		var usernameUnavailable = await knex('users').select().where({
			username: username
		})

		usernameUnavailable = usernameUnavailable[0]

		var emailUnavailable = await knex('users').select().where({
			email: email
		})

		emailUnavailable = emailUnavailable[0]

		if (usernameUnavailable || emailUnavailable) {

			var usernameTakenMessage = {
				notifyerOn: true,
				notifyerColor: 'warning',
				notifyerMessage: 'User ' + username + ' already exists. Try another one.'
			}

			res.send(usernameTakenMessage)
			console.log('User tried to registrate with unavailable username');

		} else {

			var salt = 10
			var hashedPassword = await bcrypt.hash(password, salt)

			await knex('users').insert({
				username: username,
				password: hashedPassword,
				email: email,
				firstname: firstname,
				lastname: lastname,
				age: age,
				height: height,
				weight: weight,
				equipment: equipment,
				color: color,
				admin: false
			})

			var successMessage = {
				notifyerOn: true,
				notifyerColor: 'green',
				notifyerMessage: 'Registered as ' + username
			}

			res.send(successMessage)
			console.log('User ' + username + ' was registered');

		}

	} catch (error) {

		var errorMessage = {
			notifyerOn: true,
			notifyerColor: 'red',
			notifyerMessage: 'Registration failed. Try agian later.'
		}

		res.send(errorMessage)
		console.error(error.message);

	}
})

// ANCHOR This interface will handle the incoming login POST-Requests
router.post('/login', async (req, res) => {

	var {
		username,
		password
	} = req.body

	var DBUser = await knex('users').select().where({
		username: username
	})

	DBUser = DBUser[0]

	if (DBUser == null) {

		var userdoesNotExistMessage = {
			notifyerOn: true,
			notifyerColor: 'error',
			notifyerMessage: 'Cannot find user ' + username + '. Try again.'
		}

		console.log('User ' + username + ' does not exist.');
		return res.send(userdoesNotExistMessage)

	} else {

		try {
			
			if(await bcrypt.compare(password, DBUser.password)) {

				var user = {
					username
				}

				var accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

				res.json({accessToken: accessToken})

			} else {

				var passwordIncorrectMessage = {
					notifyerOn: true,
					notifyerColor: 'error',
					notifyerMessage: 'Pass word is incorrect. Try again.'
				}

				res.send(passwordIncorrectMessage)
				console.log('User tried log into ' + username + ' with incorrect password.');
			}

		} catch (error) {
			
			var errorMessage = {
				notifyerOn: true,
				notifyerColor: 'red',
				notifyerMessage: 'Login failed. Try again.'
			}
	
			res.send(errorMessage)
			console.error(error);

		}
	}

})
// !SECTION

// SECTION Exports
module.exports = router
// !SECTION