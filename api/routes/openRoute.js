//SECTION Dependencies
var express = require('./../node_modules/express')
var bcrypt = require('./../node_modules/bcryptjs')
var knex = require('./../knexReference.js')
var jwt = require('./../node_modules/jsonwebtoken')
var router = express.Router()
//!SECTION

//SECTION Interfaces
//ANCHOR Checks username of new user
router.post('/checkUsername', async (req, res) => {
	try {
		var {
			req_username,
		} = req.body
		var DBUsername = await knex('users')
			.where({
				user_username: req_username
			})
		DBUsername = DBUsername[0]
		if (DBUsername == null) {
			var usernameStatus = {
				alertValue: true,
				alertType: 'success',
				alertMessage: 'Username is available.'
			}
			return res.json({
				usernameStatus: usernameStatus,
				usernameCheck: true
			})
		} else {
			var usernameStatus = {
				alertValue: true,
				alertType: 'error',
				alertMessage: 'Username is unavailable.'
			}
			return res.json({
				usernameStatus: usernameStatus,
				usernameCheck: false
			})
		}
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			snackbarOn: true,
			snackbarColor: 'error',
			snackbarMessage: 'Unable to check username.'
		}
		res.send(errorMessage)
	}
})
//ANCHOR Checks email of new user
router.post('/checkEmail', async (req, res) => {
	try {
		var {
			req_email,
		} = req.body
		var DBEmail = await knex('users')
			.where({
				user_email: req_email
			})
		DBEmail = DBEmail[0]
		if (DBEmail == null) {
			var usernameStatus = {
				alertValue: true,
				alertType: 'success',
				alertMessage: 'Email is available.'
			}
			return res.json({
				usernameStatus: usernameStatus,
				emailCheck: true
			})
		} else {
			var usernameStatus = {
				alertValue: true,
				alertType: 'error',
				alertMessage: 'Email is unavailable.'
			}
			return res.json({
				usernameStatus: usernameStatus,
				emailCheck: false
			})
		}
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			snackbarOn: true,
			snackbarColor: 'error',
			snackbarMessage: 'Unable to check email.'
		}
		res.send(errorMessage)
	}
})
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
			req_image,
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
				snackbarOn: true,
				snackbarColor: 'warning',
				snackbarMessage: 'User ' + req_username + ' or email ' + req_email + ' already exists. Try another one.'
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
					user_image: req_image,
					user_height: req_height,
					user_weight: req_weight,
					user_equipment: req_equipment,
					user_color: req_color,
					user_adminAuthorization: false
				})
			var successMessage = {
				snackbarOn: true,
				snackbarColor: 'success',
				snackbarMessage: 'Registered as ' + req_username
			}
			res.send(successMessage)
		}
	} catch (error) {
		console.error(error.message);
		var errorMessage = {
			snackbarOn: true,
			snackbarColor: 'red',
			snackbarMessage: 'Registration failed. Try agian later.'
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
			snackbarOn: true,
			snackbarColor: 'error',
			snackbarMessage: 'Cannot find user ' + req_username + '. Try again.'
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

				function generateRefreshToken(tokenData) {
					return jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET)
				}
				var accessToken = generateAccessToken(tokenData)
				var refreshToken = generateRefreshToken(tokenData)
				res.json({
					accessToken: accessToken,
					refreshToken: refreshToken
				})
			} else {
				var passwordIncorrectMessage = {
					snackbarOn: true,
					snackbarColor: 'error',
					snackbarMessage: 'Password is incorrect. Try again.'
				}
				res.json({
					passwordIncorrectMessage: passwordIncorrectMessage
				})
			}
		} catch (error) {
			console.error(error.message);
			var errorMessage = {
				snackbarOn: true,
				snackbarColor: 'error',
				snackbarMessage: 'Login failed. Try again.'
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
			snackbarOn: true,
			snackbarColor: 'error',
			snackbarMessage: 'Failed to refresh token. Try again.'
		}
		res.send(errorMessage)
	}
})
//!SECTION

//SECTION Exports
module.exports = router
//!SECTION