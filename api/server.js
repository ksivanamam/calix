// SECTION Dependencies
// ANCHOR Requires all the necessary dependencies
var express = require('./node_modules/express')
var app = express()
var checkAuth = require('./middleware/checkAuth')
// !SECTION

// SECTION Server settiungs
app.use(express.json())

// ANCHOR server listens to port 3000 and logs the statement below
var port = 3000
app.listen(port, () => console.log('Listening to port ' + port))

// ANCHOR Requires the open route which does not require any authentication and uses the endpoint inside the file
var openRoute = require('./routes/openRoute')
app.use('/openRoute', visitorsRoute)

// ANCHOR Requires the protected route which requires authentication and uses the endpoints inseide the file
var protectedRoute = require('./routes/protectedRoute')
app.use('/protectedRoute', checkAuth, employeeRoute)
// !SECTION