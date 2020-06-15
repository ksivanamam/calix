//SECTION Dependencies
var express = require('../node_modules/express')
var router = express.Router()
var knex = require('./../knexReference')
const {
	where
} = require('./../knexReference')
//!SECTION

//SECTION Interfaces for all users
//ANCHOR Sends selected profil data
//NOTE Do not send passwords or anything related to authentication
router.get('/profil', async (req, res) => {
	try {
		var data = await knex('users')
			.select(
				'userPK',
				'username',
				'email',
				'firstname',
				'lastname',
				'yearOfBirth',
				'height',
				'weight',
				'equipment',
				'color'
				)
			.where({
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

//ANCHOR Changes user data to the given data in req.body
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
		await knex('users')
			.update({
				email: email,
				yearOfBirth: yearOfBirth,
				height: height,
				weight: weight,
				equipment: equipment,
				color: color
			})
			.where({
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
			notifyerMessage: 'Profil data cannot be changed. Try again.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR Deletes user profil in table "users"
router.delete('/delProfil', async (req, res) => {
	try {
		await knex('users')
			.delete()
			.where({
				userPK: req.decodedToken.userPK
			})
		var successMessage = {
			notifyerOn: true,
			notifyerColor: "info",
			notifyerMessage: "Profil has been deleted. So long partner..."
		}
		res.send(successMessage)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			notifyerOn: true,
			notifyerColor: 'error',
			notifyerMessage: "Account could not be deleted. Try again."
		}
		res.send(errorMessage)
	}
})

//ANCHOR Send all exercises in table "exerciseLibrary"
router.get('/publicExercises', async (req, res) => {
	try {
		var data = await knex('exerciseLibrary')
		.where({
			public: true
		})
		res.send(data)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			notifyerOn: true,
			notifyerColor: 'error',
			notifyerMessage: 'Exercises could not be loaded. Try again.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR Send all exercises created by the user
router.get('/customExercises', async (req, res) => {
	try {
		var data = await knex('exerciseLibrary')
		.where({
			public: false,
			userFK: req.decodedToken.userPK
		})
		res.send(data)
	} catch(error) {
		console.error(error.message)
		var errorMessage = {
			notifyerOn: true,
			notifyerColor: 'error',
			notifyerMessage: 'Custom exercises could not be loaded. Try again.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR Sends all public workouts
router.get('/publicWorkouts', async (req, res) => {
	try {
		var data = await knex('workouts')
			.where({
				public: true
			})
		res.send(data)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			notifyerOn: true,
			notifyerColor: 'error',
			notifyerMessage: 'Workouts could not be loaded. Try again.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR Sends all workouts created by the user
router.get('/customWorkouts', async (req, res) => {
	try {
		var data = await knex('workouts')
			.where({
				public: false,
				userFK: req.decodedToken.userPK
			})
			.join(
				'workoutExercises',
				'workoutExercises.workoutFK',
				'workouts.workoutPK'
			)
		res.send(data)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			notifyerOn: true,
			notifyerColor: 'error',
			notifyer: 'Custom workouts could not be loaded. Try again.'
		}
		res.send(errorMessage)
	}
})

router.get('/workoutExercises/:workoutPK', async (req, res) => {
	try {
		var data = await knex('workoutExercises')
			.where({
				workoutFK: req.params.workoutPK
			})
		res.send(data)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			notifyerOn: true,
			notifyerColor: 'error',
			notifyerMessage: 'Unable to load exersices for this workout. Try again.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR Sends users weekly plan
router.get('/plans', async (req, res) => {
	try {
		var data = await knex('plans')
			.where({
				plansUserFK: req.decodedToken.userPK
			})
			.join(
				'workouts',
				'workouts.workoutPK',
				'plans.workoutFK'
			)
		res.send(data)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			notifyerOn: true,
			notifyerColor: 'error',
			notifyerMEssage: 'Weekly workout plan could not be loaded. Try agian.'
		}
		res.send(errorMessage)
	}
})
// !SECTION

// SECTION Exports
module.exports = router
// !SECTION