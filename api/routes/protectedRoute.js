//SECTION Dependencies
var express = require('../node_modules/express')
var router = express.Router()
var knex = require('./../knexReference')
//!SECTION

//SECTION Interfaces for all users
//ANCHOR Sends selected profil data
//NOTE Do not send passwords or anything related to authentication
router.get('/profil', async (req, res) => {
	try {
		var data = await knex('users')
			.select(
				'user_PK',
				'user_username',
				'user_email',
				'user_firstname',
				'user_lastname',
				'user_yearOfBirth',
				'user_sex',
				'user_height',
				'user_weight',
				'user_image',
				'user_equipment',
				'user_color'
			)
			.where({
				user_PK: req.decodedToken.user_PK
			})
		res.send(data)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			snackOn: true,
			snackColor: 'error',
			snackMessage: 'Profil data cannot be loaded. Try again.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR Changes user data to the given data in req.body
router.put('/profil', async (req, res) => {
	try {
		var {
			req_email,
			req_yearOfBirth,
			req_height,
			req_weight,
			req_equipment,
			req_color
		} = req.body
		await knex('users')
			.update({
				user_email: req_email,
				user_yearOfBirth: req_yearOfBirth,
				user_height: req_height,
				user_weight: req_weight,
				user_equipment: req_equipment,
				user_color: req_color
			})
			.where({
				user_PK: req.decodedToken.user_PK
			})
		var successMessage = {
			snackOn: true,
			snackColor: 'success',
			snackMessage: 'Profil data successfully changed.'
		}
		res.send(successMessage)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			snackOn: true,
			snackColor: 'error',
			snackMessage: 'Profil data cannot be changed. Try again.'
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
				user_PK: req.decodedToken.user_PK
			})
		var successMessage = {
			snackOn: true,
			snackColor: "info",
			snackMessage: "Profil has been deleted. So long partner..."
		}
		res.send(successMessage)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			snackOn: true,
			snackColor: 'error',
			snackMessage: "Account could not be deleted. Try again."
		}
		res.send(errorMessage)
	}
})

//ANCHOR Send all exercises in table "exercises"
router.get('/publicExercises', async (req, res) => {
	try {
		var data = await knex('exercises')
			.where({
				exercise_public: true
			})
		res.send(data)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			snackOn: true,
			snackColor: 'error',
			snackMessage: 'Exercises could not be loaded. Try again.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR Send all exercises created by the user
router.get('/customExercises', async (req, res) => {
	try {
		var data = await knex('exercises')
			.where({
				exercise_public: false,
				exercise_user_FK: req.decodedToken.user_PK
			})
		res.send(data)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			snackOn: true,
			snackColor: 'error',
			snackMessage: 'Custom exercises could not be loaded. Try again.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR Adds a custom exercise
router.post('/customExercises', async (req, res) => {
	try {
		var {
			req_name,
			req_weighted,
			req_advanced,
			req_engagement,
			req_type
		} = req.body
		await knex('exercises')
			.insert({
				exercise_name: req_name,
				exercise_weighted: req_weighted,
				exercise_advanced: req_advanced,
				exercise_engagement: req_engagement,
				exercise_type: req_type,
				exercise_public: false,
				exercise_user_FK: req.decodedToken.user_PK
			})
		var successMessage = {
			snackOn: true,
			snackColor: 'success',
			snackMessage: 'Custom exercise successfully added.'
		}
		res.send(successMessage)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			snackOn: true,
			snackColor: 'error',
			snackMessage: 'Unable to add a custom exercise. Try again.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR Changes properties of custom exercise
router.put('/customExercises/:exercise_PK', async (req, res) => {
	try {
		var {
			req_name,
			req_weighted,
			req_advanced,
			req_engagement,
			req_type
		} = req.body
		await knex('exercises')
		.update({
			exercise_name: req_name,
			exercise_weighted: req_weighted,
			exercise_advanced: req_advanced,
			exercise_engagement: req_engagement,
			exercise_type: req_type,
		})
		.where({
			exercise_user_FK: req.decodedToken.user_PK,
			exercise_PK: req.params.exercise_PK
		})
		var successMessage = {
			snackOn: true,
			snackColor: 'success',
			snackMessage: 'Custom exercise successfully added.'
		}
		res.send(successMessage)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			snackOn: true,
			snackColor: 'error',
			snackMessage: 'Unable to add a custom exercise. Try again.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR Deletes custom exercies from exercise library
router.delete('/customExercises/:exercises_PK', async (req, res) => {
	console.log(req.decodedToken.user_PK)
	try {
		await knex('exercises')
			.delete()
			.where({
				exercise_user_FK: req.decodedToken.user_PK,
				exercise_PK: req.params.exercises_PK
			})
		var successMessage = {
			snackOn: true,
			snackColor: 'success',
			snackMessage: 'Custom exercise has been removed.'
		}
		res.send(successMessage)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			snackOn: true,
			snackColor: 'error',
			snackMessage: 'Unable to delete custom exercise. Try again.'

		}
		res.send(errorMessage)
	}
})

//ANCHOR Sends all public workouts
router.get('/publicWorkouts', async (req, res) => {
	try {
		var data = await knex('workouts')
			.where({
				workout_public: true
			})
		res.send(data)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			snackOn: true,
			snackColor: 'error',
			snackMessage: 'Workouts could not be loaded. Try again.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR Sends all workouts created by the user
router.get('/customWorkouts', async (req, res) => {
	try {
		var data = await knex('workouts')
			.where({
				workout_public: false,
				workout_user_FK: req.decodedToken.user_PK
			})
			// .join(
			// 	'workoutExercises',
			// 	'workoutExercises.workoutExercise_workout_FK',
			// 	'workouts.workout_PK'
			// )
		res.send(data)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			snackOn: true,
			snackColor: 'error',
			notifyer: 'Custom workouts could not be loaded. Try again.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR Adds custom workout to table workouts
router.post('/customWorkouts', async (req, res) => {
	try {
		var {
			req_name,
			req_focus,
			req_difficulty
		} = req.body
		await knex('workouts')
			.insert({
				workout_name: req_name,
				workout_focus: req_focus,
				workout_difficulty: req_difficulty,
				workout_public: false,
				workout_user_FK: req.decodedToken.user_PK
			})
		var successMessage = {
			snackOn: true,
			snackColor: 'success',
			snackMessage: 'Successfully created custom workout.'
		}
		res.send(successMessage)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			snackOn: true,
			snackColor: 'error',
			snackMessage: 'Unable to create custom workout. Try again.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR Changes the properties of a custom workout
router.put('/customWorkouts/:workout_PK', async (req, res) => {
	try {
		var {
			req_name,
			req_focus,
			req_difficulty
		} = req.body
		await knex('workouts')
			.update({
				workout_name: req_name,
				workout_focus: req_focus,
				workout_difficulty: req_difficulty
			})
			.where({
				workout_user_FK: req.decodedToken.user_PK,
				workout_PK: req.params.workout_PK
			})
		var successMessage = {
			snackOn: true,
			snackColor: 'success',
			snackMessage: 'Properties of workout changed.'
		}
		res.send(successMessage)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			snackOn: true,
			snackColor: 'error',
			snackMessage: 'Unable to change properties. Try again.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR Deletes custom workout by user
router.delete('/customWorkouts/:workout_PK', async (req, res) => {
	try {
		await knex('workouts')
			.delete()
			.where({
				workout_user_FK: req.decodedToken.user_PK,
				workout_PK: req.params.workout_PK
			})
		var successMessage = {
			snackOn: true,
			snackColor: 'success',
			snackMessage: 'Successfully deleted custom workout.'
		}
		res.send(successMessage)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			snackOn: true,
			snackColor: 'error',
			snackMessage: 'Unable to delete custom workout. Try again.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR Send all exercises related to a workout
router.get('/workoutExercises/:workout_PK', async (req, res) => {
	try {
		var data = await knex('workoutExercises')
			.join(
				'exercises',
				'exercises.exercise_PK',
				'workoutExercises.workoutExercise_exercise_Fk'
			)
			.where({
				workoutExercise_workout_FK: req.params.workout_PK
			})
		res.send(data)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			snackOn: true,
			snackColor: 'error',
			snackMessage: 'Unable to load exersices for this workout. Try again.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR Adds exercise to workout
router.post('/workoutExercises', async (req, res) => {
	var {
		req_exercise_PK,
		req_workoutExercise_sets,
		req_workoutExercise_reps,
		req_workout_PK
	} = req.body
	var targetExercise = await knex('exercises')
		.where({
			exercise_PK: req_exercise_PK
		})
	targetExercise = targetExercise[0]
	var targetWorkout = await knex('workouts')
		.where({
			workout_PK: req_workout_PK
		})
	targetWorkout = targetWorkout[0]
	if (targetExercise == null || targetWorkout == null) {
		var exerciseOrWorkoutDoesNotExist = {
			snackOn: true,
			snackColor: 'error',
			snackMessage: 'Exercise or Workout does not exist.'
		}
		return res.send(exerciseOrWorkoutDoesNotExist)
	} else {
		try {
			if (targetExercise.exercise_user_FK === req.decodedToken.user_PK && targetWorkout.workout_user_FK === req.decodedToken.user_PK) {
				await knex('workoutExercises')
					.insert({
						workoutExercise_exercise_FK: req_exercise_PK,
						workoutExercise_sets: req_workoutExercise_sets,
						workoutExercise_reps: req_workoutExercise_reps,
						workoutExercise_workout_FK: req_workout_PK
					})
				var successMessage = {
					snackOn: true,
					snackColor: 'success',
					snackMessage: 'Exercise successfully added to workout.'
				}
				res.send(successMessage)
			} else {
				var notTheCreator = {
					snackOn: true,
					snackColor: 'warning',
					snackMessage: 'Exercise or workout is not created by this account.'
				}
				res.send(notTheCreator)
			}
		} catch (error) {
			console.error(error.message)
			var errorMessage = {
				snackOn: true,
				snackColor: 'error',
				snackMessage: 'Unable to add exercise to workout. Try again.'
			}
			res.send(errorMessage)
		}
	}
})

//ANCHOR Changes properties of exercises in workouts
router.put('/workoutExercises/:workoutExercise_PK', async (req, res) => {
	var {
		req_exercise_PK,
		req_workoutExercise_sets,
		req_workoutExercise_reps,
		req_workout_PK
	} = req.body
	var targetExercise = await knex('exercises')
		.where({
			exercise_PK: req_exercise_PK
		})
	targetExercise = targetExercise[0]
	var targetWorkout = await knex('workouts')
		.where({
			workout_PK: req_workout_PK
		})
	targetWorkout = targetWorkout[0]
	if (targetExercise == null || targetWorkout == null) {
		var exerciseOrWorkoutDoesNotExist = {
			snackOn: true,
			snackColor: 'error',
			snackMessage: 'Exercise or Workout does not exist.'
		}
		return res.send(exerciseOrWorkoutDoesNotExist)
	} else {
		try {
			if (targetExercise.exercise_user_FK === req.decodedToken.user_PK && targetWorkout.workout_user_FK === req.decodedToken.user_PK) {
				await knex('workoutExercises')
					.update({
						workoutExercise_exercise_FK: req_exercise_PK,
						workoutExercise_sets: req_workoutExercise_sets,
						workoutExercise_reps: req_workoutExercise_reps,
						workoutExercise_workout_FK: req_workout_PK
					})
					.where({
						workoutExercise_PK: req.params.workoutExercise_PK
					})
				var successMessage = {
					snackOn: true,
					snackColor: 'success',
					snackMessage: 'Successfully changed properties of exercise.'
				}
				res.send(successMessage)
			} else {
				var notTheCreator = {
					snackOn: true,
					snackColor: 'warning',
					snackMessage: 'Exercise or workout is not created by this account.'
				}
				res.send(notTheCreator)
			}
		} catch (error) {
			console.error(error.message)
			var errorMessage = {
				snackOn: true,
				snackColor: 'error',
				snackMessage: 'Unable to change properties of exercise. Try again.'
			}
			res.send(errorMessage)
		}
	}
})

//ANCHOR Removes exercise from workout but remeins in exercise library
router.delete('/workoutExercises/:workoutExercise_PK', async (req, res) => {
	var targetWorkoutExercise = await knex('workoutExercises')
		.where({
			workoutExercise_PK: req.params.workoutExercise_PK
		})
	targetWorkoutExercise = targetWorkoutExercise[0]
	var targetWorkout = await knex('workouts')
		.where({
			workout_PK: targetWorkoutExercise.workoutExercise_workout_FK
		})
	targetWorkout = targetWorkout[0]
	if (targetWorkout == null) {
		var exerciseOrWorkoutDoesNotExist = {
			snackOn: true,
			snackColor: 'error',
			snackMessage: 'Workout does not exist.'
		}
		return res.send(exerciseOrWorkoutDoesNotExist)
	} else {
		try {
			if (targetWorkout.workout_user_FK == req.decodedToken.user_PK) {
				await knex('workoutExercises')
					.del()
					.where({
						workoutExercise_PK: req.params.workoutExercise_PK
					})
				var successMessage = {
					snackOn: true,
					snackColor: 'success',
					snackMessage: 'Exercise successfully removed from workout.'
				}
				res.send(successMessage)
			} else {
				var notTheCreator = {
					snackOn: true,
					snackColor: 'warning',
					snackMessage: 'Exercise or workout is not created by this account.'
				}
				res.send(notTheCreator)
			}
		} catch (error) {
			console.error(error.message)
			var errorMessage = {
				snackOn: true,
				snackColor: 'error',
				snackMessage: 'Unable to remove exercise from workout. Try again.'
			}
			res.send(errorMessage)
		}
	}
})

//ANCHOR Sends users weekly plan
router.get('/plans', async (req, res) => {
	try {
		var data = await knex('plans')
			.where({
				plan_user_FK: req.decodedToken.user_PK
			})
			.join(
				'workouts',
				'workouts.workout_PK',
				'plans.plan_workout_FK'
			)
		res.send(data)
	} catch (error) {
		console.error(error.message)
		var errorMessage = {
			snackOn: true,
			snackColor: 'error',
			snackMessage: 'Weekly workout plan could not be loaded. Try agian.'
		}
		res.send(errorMessage)
	}
})

//ANCHOR Adds workout to weekly plan
router.post('/plans/:plan_day', async (req, res) => {
	try {
		var {
			req_plan_workout_FK,
		} = req.body
		await knex('plans')
		.insert({
			plan_user_FK: req.decodedToken.user_PK,
			plan_workout_FK: req_plan_workout_FK,
			plan_day: req.params.plan_day
		})
		var errorMessage = {
			snackOn: true,
			snackColor: 'success',
			snackMessage: 'Workout successfully added to plan.'
		}
		res.send(successMessage)
	} catch(error) {
		console.error(error.message)
		var errorMessage = {
			snackOn: true,
			snackColor: 'error',
			snackMessage: 'Unable to add workout to plan. Try again.'
		}
		res.send(errorMessage)
	}
})

 //ANCHOR Deletes workout in weekly plan
 router.delete('/plans/:plan_PK', async (req, res) => {
	 try {
		await knex('plans')
		.del()
		.where({
			plan_user_FK: req.decodedToken.user_PK,
			plan_PK: req.params.plan_PK
		})
		var errorMessage = {
			snackOn: true,
			snackColor: 'success',
			snackMessage: 'Workout successfully deleted from plan.'
		}
		res.send(successMessage)
	 } catch(error) {
		 console.error(error.message)
		 var errorMessage = {
			 snackOn: true,
			 snackColor: 'error',
			 snackMessage: 'Unable to delete workout in weekly plan. Try again.'
		 }
		 res.send(errorMessage)
	 }
 })
// !SECTION

// SECTION Exports
module.exports = router
// !SECTION