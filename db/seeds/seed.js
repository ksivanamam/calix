var bcrypt = require('./../node_modules/bcryptjs')

exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('users').del()
	await knex('workouts').del()
	await knex('exercises').del()
	await knex('workoutExercises').del()
	await knex('plans').del()

	await knex('users').insert([{
			user_username: 'admin',
			user_password: await bcrypt.hash('admin', 10),
			user_email: 'admin@calix.ch',
			user_firstname: 'admin',
			user_lastname: 'admin',
			user_yearOfBirth: 1,
			user_height: 1,
			user_weight: 1,
			user_equipment: false,
			user_color: 'orange',
			user_adminAuthorization: true
		},
		{
			user_username: 'kasi',
			user_password: await bcrypt.hash('admin', 10),
			user_email: 'kasi@tfbern.ch',
			user_firstname: 'Kabilan',
			user_lastname: 'Sivanamam',
			user_yearOfBirth: 1998,
			user_height: 171,
			user_weight: 70,
			user_equipment: false,
			user_color: 'orange',
			user_adminAuthorization: false
		},
		{
			user_username: 'doke',
			user_password: await bcrypt.hash('admin', 10),
			user_email: 'doke@tfbern.ch',
			user_firstname: 'Dominik',
			user_lastname: 'Keller',
			user_yearOfBirth: 2001,
			user_height: 180,
			user_weight: 75,
			user_equipment: false,
			user_color: 'Green',
			user_adminAuthorization: false
		},
		{
			user_username: 'alul',
			user_password: await bcrypt.hash('admin', 10),
			user_email: 'alul@tfbern.ch',
			user_firstname: 'Ali',
			user_lastname: 'Ülgen',
			user_yearOfBirth: 1999,
			user_height: 185,
			user_weight: 100,
			user_equipment: false,
			user_color: 'red',
			user_adminAuthorization: false
		},
		{
			user_username: 'bahe',
			user_password: await bcrypt.hash('admin', 10),
			user_email: 'bahe@tfbern.ch',
			user_firstname: 'Hezekiah',
			user_lastname: 'Bakare-Johnson',
			user_yearOfBirth: 1999,
			user_height: 185,
			user_weight: 100,
			user_equipment: false,
			user_color: 'red',
			user_adminAuthorization: false
		},
		{
			user_username: 'test',
			user_password: await bcrypt.hash('test', 10),
			user_email: 'test@tfbern.ch',
			user_firstname: 'test',
			user_lastname: 'test-test',
			user_yearOfBirth: 1999,
			user_height: 185,
			user_weight: 100,
			user_equipment: false,
			user_color: 'red',
			user_adminAuthorization: false
		}
	])

	await knex('workouts').insert([{
			workout_name: 'A',
			workout_focus: 'Arms & Back',
			workout_difficulty: 2,
			workout_user_FK: 1,
			workout_public: true
		},
		{
			workout_name: 'B',
			workout_focus: 'running',
			workout_difficulty: 3,
			workout_user_FK: 1,
			workout_public: true
		},
		{
			workout_name: 'C',
			workout_focus: 'running',
			workout_difficulty: 3,
			workout_user_FK: 1,
			workout_public: true
		},
		{
			workout_name: 'D',
			workout_focus: 'running',
			workout_difficulty: 3,
			workout_user_FK: 1,
			workout_public: true
		},
		{
			workout_name: 'E',
			workout_focus: 'running',
			workout_difficulty: 3,
			workout_user_FK: 1,
			workout_public: true
		},
		{
			workout_name: 'F',
			workout_focus: 'running',
			workout_difficulty: 3,
			workout_user_FK: 1,
			workout_public: true
		},
		{
			workout_name: 'G',
			workout_focus: 'running',
			workout_difficulty: 3,
			workout_user_FK: 1,
			workout_public: true
		},
		{
			workout_name: 'H',
			workout_focus: 'flexibility',
			workout_difficulty: 1,
			workout_user_FK: 6,
			workout_public: false
		}
	])

	await knex('exercises').insert([{
			exercise_name: 'Pull Up',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Upper Back',
			exercise_type: 'Strength',
			exercise_public: true,
			exercise_user_FK: 1
		},
		{
			exercise_name: 'Push Up',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Triceps',
			exercise_type: 'Strength',
			exercise_public: true,
			exercise_user_FK: 1
		},
		{
			exercise_name: 'Chin Up',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Biceps',
			exercise_type: 'Strength',
			exercise_public: true,
			exercise_user_FK: 1
		},
		{
			exercise_name: '100m running',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Legs',
			exercise_type: 'Speed',
			exercise_public: true,
			exercise_user_FK: 1
		},
		{
			exercise_name: '200m running',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Legs',
			exercise_type: 'Speed',
			exercise_public: true,
			exercise_user_FK: 1
		},
		{
			exercise_name: '300m running',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Legs',
			exercise_type: 'Speed',
			exercise_public: true,
			exercise_user_FK: 1
		},
		{
			exercise_name: '400m running',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Legs',
			exercise_type: 'Speed',
			exercise_public: true,
			exercise_user_FK: 1
		},
		{
			exercise_name: '500m running',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Legs',
			exercise_type: 'Speed',
			exercise_public: true,
			exercise_user_FK: 1
		},
		{
			exercise_name: '600m running',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Legs',
			exercise_type: 'Speed',
			exercise_public: true,
			exercise_user_FK: 1
		},
		{
			exercise_name: '700m running',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Legs',
			exercise_type: 'Speed',
			exercise_public: true,
			exercise_user_FK: 1
		},
		{
			exercise_name: '800m running',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Legs',
			exercise_type: 'Speed',
			exercise_public: true,
			exercise_user_FK: 1
		},
		{
			exercise_name: '900m running',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Legs',
			exercise_type: 'Speed',
			exercise_public: true,
			exercise_user_FK: 1
		},
		{
			exercise_name: '1000m running',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Legs',
			exercise_type: 'Speed',
			exercise_public: true,
			exercise_user_FK: 1
		},
		{
			exercise_name: '2km jogging',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Legs',
			exercise_type: 'Endurance',
			exercise_public: true,
			exercise_user_FK: 1
		},
		{
			exercise_name: '4km jogging',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Legs',
			exercise_type: 'Endurance',
			exercise_public: true,
			exercise_user_FK: 1
		},
		{
			exercise_name: '6km jogging',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Legs',
			exercise_type: 'Endurance',
			exercise_public: true,
			exercise_user_FK: 1
		},
		{
			exercise_name: '8km jogging',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Legs',
			exercise_type: 'Endurance',
			exercise_public: true,
			exercise_user_FK: 1
		},
		{
			exercise_name: '10km jogging',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Legs',
			exercise_type: 'Endurance',
			exercise_public: true,
			exercise_user_FK: 1
		},
		{
			exercise_name: 'Split',
			exercise_weighted: false,
			exercise_advanced: false,
			exercise_engagement: 'Legs',
			exercise_type: 'Flexibility',
			exercise_public: false,
			exercise_user_FK: 6
		},
	])

	await knex('workoutExercises').insert([{
			workoutExercise_exercise_FK: 1,
			workoutExercise_sets: 2,
			workoutExercise_reps: 10,
			workoutExercise_workout_FK: 1
		},
		{
			workoutExercise_exercise_FK: 2,
			workoutExercise_sets: 2,
			workoutExercise_reps: 30,
			workoutExercise_workout_FK: 1
		},
		{
			workoutExercise_exercise_FK: 3,
			workoutExercise_sets: 2,
			workoutExercise_reps: 10,
			workoutExercise_workout_FK: 1
		},
		{
			workoutExercise_exercise_FK: 4,
			workoutExercise_sets: 2,
			workoutExercise_reps: 10,
			workoutExercise_workout_FK: 2
		},
		{
			workoutExercise_exercise_FK: 5,
			workoutExercise_sets: 2,
			workoutExercise_reps: 10,
			workoutExercise_workout_FK: 3
		},
		{
			workoutExercise_exercise_FK: 6,
			workoutExercise_sets: 2,
			workoutExercise_reps: 10,
			workoutExercise_workout_FK: 4
		},
		{
			workoutExercise_exercise_FK: 7,
			workoutExercise_sets: 2,
			workoutExercise_reps: 10,
			workoutExercise_workout_FK: 5
		},
		{
			workoutExercise_exercise_FK: 8,
			workoutExercise_sets: 2,
			workoutExercise_reps: 10,
			workoutExercise_workout_FK: 6
		},
		{
			workoutExercise_exercise_FK: 9,
			workoutExercise_sets: 2,
			workoutExercise_reps: 10,
			workoutExercise_workout_FK: 7
		},
		{
			workoutExercise_exercise_FK: 19,
			workoutExercise_sets: 2,
			workoutExercise_reps: 10,
			workoutExercise_workout_FK: 8
		}
	])

	await knex('plans').insert([{
		plan_user_FK: 6,
		plan_workout_FK: 1,
		plan_day: 0
	}])
};