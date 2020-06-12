var bcrypt = require('./../node_modules/bcryptjs')

exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('users').del()
	await knex('workouts').del()
	await knex('exerciseLibrary').del()
	await knex('workoutExercises').del()
	await knex('plans').del()

	await knex('users').insert([{
			username: 'admin',
			password: await bcrypt.hash('admin', 10),
			email: 'admin@calix.ch',
			firstname: 'admin',
			lastname: 'admin',
			yearOfBirth: 1,
			height: 1,
			weight: 1,
			equipment: false,
			color: 'orange',
			adminAuthorization: true
		},
		{
			username: 'kasi',
			password: await bcrypt.hash('admin', 10),
			email: 'kasi@tfbern.ch',
			firstname: 'Kabilan',
			lastname: 'Sivanamam',
			yearOfBirth: 22,
			height: 171,
			weight: 70,
			equipment: false,
			color: 'orange',
			adminAuthorization: false
		},
		{
			username: 'doke',
			password: await bcrypt.hash('admin', 10),
			email: 'doke@tfbern.ch',
			firstname: 'Dominik',
			lastname: 'Keller',
			yearOfBirth: 18,
			height: 180,
			weight: 75,
			equipment: false,
			color: 'Green',
			adminAuthorization: false
		},
		{
			username: 'alul',
			password: await bcrypt.hash('admin', 10),
			email: 'alul@tfbern.ch',
			firstname: 'Ali',
			lastname: 'Ülgen',
			yearOfBirth: 20,
			height: 185,
			weight: 100,
			equipment: false,
			color: 'red',
			adminAuthorization: false
		},
		{
			username: 'bahe',
			password: await bcrypt.hash('admin', 10),
			email: 'bahe@tfbern.ch',
			firstname: 'Hezekiah',
			lastname: 'Bakare-Johnson',
			yearOfBirth: 20,
			height: 185,
			weight: 100,
			equipment: false,
			color: 'red',
			adminAuthorization: false
		}
	])

	await knex('workouts').insert([{
			name: 'A',
			focus: 'Arms & Back',
			difficulty: 2
		},
		{
			name: 'B',
			focus: 'runningning',
			difficulty: 3
		},
		{
			name: 'C',
			focus: 'runningning',
			difficulty: 3
		},
		{
			name: 'D',
			focus: 'runningning',
			difficulty: 3
		},
		{
			name: 'E',
			focus: 'runningning',
			difficulty: 3
		},
		{
			name: 'F',
			focus: 'runningning',
			difficulty: 3
		},
		{
			name: 'G',
			focus: 'runningning',
			difficulty: 3
		}
	])

	await knex('exerciseLibrary').insert([{
			name: 'Pull Up',
			weighted: false,
			advanced: false,
			engagement: 'Upper Back',
			type: 'Strength'
		},
		{
			name: 'Push Up',
			weighted: false,
			advanced: false,
			engagement: 'Triceps',
			type: 'Strength'
		},
		{
			name: 'Chin Up',
			weighted: false,
			advanced: false,
			engagement: 'Biceps',
			type: 'Strength'
		},
		{
			name: '100m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed'
		},
		{
			name: '200m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed'
		},
		{
			name: '300m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed'
		},
		{
			name: '400m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed'
		},
		{
			name: '500m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed'
		},
		{
			name: '600m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed'
		},
		{
			name: '700m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed'
		},
		{
			name: '800m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed'
		},
		{
			name: '900m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed'
		},
		{
			name: '1000m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed'
		},
		{
			name: '2km jogging',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Endurance'
		},
		{
			name: '4km jogging',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Endurance'
		},
		{
			name: '6km jogging',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Endurance'
		},
		{
			name: '8km jogging',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Endurance'
		},
		{
			name: '10km jogging',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Endurance'
		},
	])

	await knex('workoutExercises').insert([{
			exerciseLibraryFK: 1,
			sets: 2,
			reps: 10,
			workoutFK: 1
		},
		{
			exerciseLibraryFK: 2,
			sets: 2,
			reps: 30,
			workoutFK: 1
		},
		{
			exerciseLibraryFK: 3,
			sets: 2,
			reps: 10,
			workoutFK: 1
		},
	])

	await knex('plans').insert([{
		userFK: 1,
		workoutFK: 1,
		day: 0
	}])
};