// SECTION Depenmdencies
var jwt = require('./../node_modules/jsonwebtoken')
require('dotenv').config()
// !SECTION

function checkAuth(req, res, next) {

	var authHeader = req.headers['authorization']
	var token = authHeader && authHeader.split(' ')[1]

	if(token == null) return res.sendStatus(401)

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, tokenData) => {
		
		if(error) return res.sendStatus(403)

		req.decodedToken = tokenData
		
		next()
	})
}

module.exports = checkAuth