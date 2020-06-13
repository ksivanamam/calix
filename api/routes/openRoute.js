//SECTION Dependencies
var express = require('./../node_modules/express')
var bcrypt = require('./../node_modules/bcryptjs')
var knex = require('./../knexReference.js')
var jwt = require('./../node_modules/jsonwebtoken')
var router = express.Router()
//!SECTION

//SECTION Interfaces
//ANCHOR THis interface will handle incoming register POST-Requests
router.post('/register', async (req, res) => {
	try {
		var {
			username,
			password,
			email,
			firstname,
			lastname,
			yearOfBirth,
			height,
			weight,
			equipment,
			color
		} = req.body
		var usernameUnavailable = await knex('users').where({
			username: username
		})
		usernameUnavailable = usernameUnavailable[0]
		var emailUnavailable = await knex('users').where({
			email: email
		})
		emailUnavailable = emailUnavailable[0]
		if (usernameUnavailable || emailUnavailable) {
			var usernameTakenMessage = {
				notifyerOn: true,
				notifyerColor: 'warning',
				notifyerMessage: 'User ' + username + ' or email ' + email + ' already exists. Try another one.'
			}
			res.send(usernameTakenMessage)
		} else {
			var salt = 10
			var hashedPassword = await bcrypt.hash(password, salt)
			await knex('users')
				.insert({
					username: username,
					password: hashedPassword,
					email: email,
					firstname: firstname,
					lastname: lastname,
					yearOfBirth: yearOfBirth,
					height: height,
					weight: weight,
					equipment: equipment,
					color: color,
					adminAuthorization: false
				})
			var successMessage = {
				notifyerOn: true,
				notifyerColor: 'success',
				notifyerMessage: 'Registered as ' + username
			}
			res.send(successMessage)
		}
	} catch (error) {
		console.error(error.message);
		var errorMessage = {
			notifyerOn: true,
			notifyerColor: 'red',
			notifyerMessage: 'Registration failed. Try agian later.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR This interface will handle the incoming login POST-Requests
router.post('/login', async (req, res) => {
	var {
		username,
		password
	} = req.body
	var DBUser = await knex('users')
		.where({
			username: username
		})
	DBUser = DBUser[0]
	if (DBUser == null) {
		var userdoesNotExistMessage = {
			notifyerOn: true,
			notifyerColor: 'error',
			notifyerMessage: 'Cannot find user ' + username + '. Try again.'
		}
		return res.send(userdoesNotExistMessage)
	} else {
		try {
			if (await bcrypt.compare(password, DBUser.password)) {
				var tokenData = {
					userPK: DBUser.userPK
				}

				function generateAccessToken(tokenData) {
					return jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
						expiresIn: '1d'
					})
				}
				// function generateRefreshToken(user) {
				// 	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
				// }
				var accessToken = generateAccessToken(tokenData)
				// var refreshToken = generateRefreshToken(user)
				res.json({
					accessToken: accessToken
				})
			} else {
				var passwordIncorrectMessage = {
					notifyerOn: true,
					notifyerColor: 'error',
					notifyerMessage: 'Password is incorrect. Try again.'
				}
				res.send(passwordIncorrectMessage)
			}
		} catch (error) {
			console.error(error.message);
			var errorMessage = {
				notifyerOn: true,
				notifyerColor: 'error',
				notifyerMessage: 'Login failed. Try again.'
			}
			res.send(errorMessage)
		}
	}

})

//ANCHOR This interface will handle incoming POST-Request for new access tokens (refreshing with refresh token)
router.post('/refresh', async (req, res) => {
	try {
		function generateAccessToken(user) {
			return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
				expiresIn: '15s'
			})
		}
		var refreshToken = req.body.refreshToken
		if (refreshToken == null) return res.sendStatus(401)
		if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
			if (error) return res.sendStatus(403)
			var accessToken = generateAccessToken({
				name: user.name
			})
			res.json({
				accessToken: accessToken
			})
		})
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			notifyerOn: true,
			notifyerColor: 'error',
			notifyerMessage: 'Failed to refresh token. Try again.'
		}
		res.send(errorMessage)
	}
})
//!SECTION

//SECTION Exports
module.exports = router
//!SECTION