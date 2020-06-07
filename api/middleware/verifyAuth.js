// SECTION Depenmdencies
var jwt = require('./../node_modules/jsonwebtoken')
// !SECTION

function verifyAuth(req, res, next) {

	var authHeader = req.headers['authorization']
	var token = authHeader && authHeader.split(' ')[1]

	if (token == null) return res.sendStatus(401)

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403), console.log(err);
		req.user = user
		next()
	})
}

module.exports = verifyAuth