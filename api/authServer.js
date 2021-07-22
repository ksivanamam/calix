// SECTION Dependencies
// ANCHOR Requires all the necessary dependencies
var express = require('./node_modules/express')
var app = express()
// !SECTION

// SECTION Server settiungs
app.use(express.json({
	limit: '50mb'
}));

app.use(express.urlencoded({
	limit: '50mb',
	parameterLimit: 50000,
	extended: true
}));

// ANCHOR server listens to port 3000 and logs the statement below
var port = 1000
app.listen(port, () => console.log('Listening to port ' + port))

// ANCHOR Requires the open route which does not require any authentication and uses the interfaces inside the file
var openRoute = require('./routes/openRoute')
app.use('/openRoute', openRoute)
// !SECTION