// SECTION Dependencies
// ANCHOR Requires all the necessary dependencies
var express = require('express')
var app = express()
var checkAuth = require('./middleware/checkAuth')
// !SECTION

// SECTION Server settiungs
app.use(express.json())

// ANCHOR server listens to port 3000 and logs the statement below
var port = 2000
app.listen(port, () => console.log('Listening to port ' + port))

// ANCHOR Requires the protected route which requires authentication and uses the interfaces inseide the file
var protectedRoute = require('./routes/protectedRoute')
app.use('/protectedRoute', checkAuth, protectedRoute)
// !SECTION