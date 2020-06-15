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
			yearOfBirth: 1998,
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
			yearOfBirth: 2001,
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
			yearOfBirth: 1999,
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
			yearOfBirth: 1999,
			height: 185,
			weight: 100,
			equipment: false,
			color: 'red',
			adminAuthorization: false
		},
		{
			username: 'test',
			password: await bcrypt.hash('test', 10),
			email: 'test@tfbern.ch',
			firstname: 'test',
			lastname: 'test-test',
			yearOfBirth: 1999,
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
			difficulty: 2,
			userFK: 1,
			public: true
		},
		{
			name: 'B',
			focus: 'running',
			difficulty: 3,
			userFK: 1,
			public: true
		},
		{
			name: 'C',
			focus: 'running',
			difficulty: 3,
			userFK: 1,
			public: true
		},
		{
			name: 'D',
			focus: 'running',
			difficulty: 3,
			userFK: 1,
			public: true
		},
		{
			name: 'E',
			focus: 'running',
			difficulty: 3,
			userFK: 1,
			public: true
		},
		{
			name: 'F',
			focus: 'running',
			difficulty: 3,
			userFK: 1,
			public: true
		},
		{
			name: 'G',
			focus: 'running',
			difficulty: 3,
			userFK: 1,
			public: true
		},
		{
			name: 'H',
			focus: 'flexibility',
			difficulty: 1,
			userFK: 6,
			public: false
		}
	])

	await knex('exerciseLibrary').insert([{
			name: 'Pull Up',
			weighted: false,
			advanced: false,
			engagement: 'Upper Back',
			type: 'Strength',
			public: true,
			userFK: 1
		},
		{
			name: 'Push Up',
			weighted: false,
			advanced: false,
			engagement: 'Triceps',
			type: 'Strength',
			public: true,
			userFK: 1
		},
		{
			name: 'Chin Up',
			weighted: false,
			advanced: false,
			engagement: 'Biceps',
			type: 'Strength',
			public: true,
			userFK: 1
		},
		{
			name: '100m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed',
			public: true,
			userFK: 1
		},
		{
			name: '200m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed',
			public: true,
			userFK: 1
		},
		{
			name: '300m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed',
			public: true,
			userFK: 1
		},
		{
			name: '400m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed',
			public: true,
			userFK: 1
		},
		{
			name: '500m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed',
			public: true,
			userFK: 1
		},
		{
			name: '600m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed',
			public: true,
			userFK: 1
		},
		{
			name: '700m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed',
			public: true,
			userFK: 1
		},
		{
			name: '800m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed',
			public: true,
			userFK: 1
		},
		{
			name: '900m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed',
			public: true,
			userFK: 1
		},
		{
			name: '1000m running',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Speed',
			public: true,
			userFK: 1
		},
		{
			name: '2km jogging',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Endurance',
			public: true,
			userFK: 1
		},
		{
			name: '4km jogging',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Endurance',
			public: true,
			userFK: 1
		},
		{
			name: '6km jogging',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Endurance',
			public: true,
			userFK: 1
		},
		{
			name: '8km jogging',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Endurance',
			public: true,
			userFK: 1
		},
		{
			name: '10km jogging',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Endurance',
			public: true,
			userFK: 1
		},
		{
			name: 'Split',
			weighted: false,
			advanced: false,
			engagement: 'Legs',
			type: 'Flexibility',
			public: false,
			userFK: 6
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
		{
			exerciseLibraryFK: 4,
			sets: 2,
			reps: 10,
			workoutFK: 2
		},
		{
			exerciseLibraryFK: 5,
			sets: 2,
			reps: 10,
			workoutFK: 3
		},
		{
			exerciseLibraryFK: 6,
			sets: 2,
			reps: 10,
			workoutFK: 4
		},
		{
			exerciseLibraryFK: 7,
			sets: 2,
			reps: 10,
			workoutFK: 5
		},
		{
			exerciseLibraryFK: 8,
			sets: 2,
			reps: 10,
			workoutFK: 6
		},
		{
			exerciseLibraryFK: 9,
			sets: 2,
			reps: 10,
			workoutFK: 7
		},
		{
			exerciseLibraryFK: 19,
			sets: 2,
			reps: 10,
			workoutFK: 8
		}
	])

	await knex('plans').insert([{
		plansUserFK: 6,
		workoutFK: 1,
		day: 0
	}])
};