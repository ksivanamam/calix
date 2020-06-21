//SECTION Dependencies
var express = require('./../node_modules/express')
var bcrypt = require('./../node_modules/bcryptjs')
var knex = require('./../knexReference.js')
var jwt = require('./../node_modules/jsonwebtoken')
var router = express.Router()
//!SECTION

//SECTION Interfaces
//ANCHOR Creates a new user
router.post('/register', async (req, res) => {
	try {
		var {
			req_username,
			req_password,
			req_email,
			req_firstname,
			req_lastname,
			req_yearOfBirth,
			req_height,
			req_weight,
			req_equipment,
			req_color
		} = req.body
		var usernameUnavailable = await knex('users').where({
			user_username: req_username
		})
		usernameUnavailable = usernameUnavailable[0]
		var emailUnavailable = await knex('users').where({
			user_email: req_email
		})
		emailUnavailable = emailUnavailable[0]
		if (usernameUnavailable || emailUnavailable) {
			var usernameTakenMessage = {
				notifyerOn: true,
				notifyerColor: 'warning',
				notifyerMessage: 'User ' + req_username + ' or email ' + req_email + ' already exists. Try another one.'
			}
			res.send(usernameTakenMessage)
		} else {
			var salt = 10
			var hashedPassword = await bcrypt.hash(req_password, salt)
			await knex('users')
				.insert({
					user_username: req_username,
					user_password: hashedPassword,
					user_email: req_email,
					user_firstname: req_firstname,
					user_lastname: req_lastname,
					user_yearOfBirth: req_yearOfBirth,
					user_height: req_height,
					user_weight: req_weight,
					user_equipment: req_equipment,
					user_color: req_color,
					user_adminAuthorization: false
				})
			var successMessage = {
				notifyerOn: true,
				notifyerColor: 'success',
				notifyerMessage: 'Registered as ' + req_username
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

//ANCHOR Logs user in with a token if credentials are correct
router.post('/login', async (req, res) => {
	var {
		req_username,
		req_password
	} = req.body
	var DBUser = await knex('users')
		.where({
			user_username: req_username
		})
	DBUser = DBUser[0]
	if (DBUser == null) {
		var userdoesNotExistMessage = {
			notifyerOn: true,
			notifyerColor: 'error',
			notifyerMessage: 'Cannot find user ' + req_username + '. Try again.'
		}
		return res.send(userdoesNotExistMessage)
	} else {
		try {
			if (await bcrypt.compare(req_password, DBUser.user_password)) {
				var tokenData = {
					user_PK: DBUser.user_PK,
					user_adminAuthorization: DBUser.user_adminAuthorization
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

//ANCHOR Sends refreshed acces token
router.post('/refresh', async (req, res) => {
	try {
		function generateAccessToken(tokenData) {
			return jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
				expiresIn: '1d'
			})
		}
		var refreshToken = req.body.refreshToken
		if (refreshToken == null) return res.sendStatus(401)
		if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, tokenData) => {
			if (error) return res.sendStatus(403)
			var accessToken = generateAccessToken({
				user_PK: tokenData.user_PK,
				user_adminAuthorization: tokenData.user_adminAuthorization
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