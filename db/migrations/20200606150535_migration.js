exports.up = async function (knex) {
	await knex.schema.createTable('users', (table) => {
		table.increments('user_PK').primary()
		table.string('user_username').notNullable().unique()
		table.string('user_password').notNullable()
		table.string('user_email').notNullable().unique()
		table.string('user_firstname').notNullable()
		table.string('user_lastname').notNullable()
		table.integer('user_yearOfBirth').notNullable()
		table.boolean('user_sex').defaultTo('male').notNullable()
		table.integer('user_height').notNullable()
		table.integer('user_weight').notNullable()
		table.specificType('user_image', 'blob').defaultTo('data:image/png;base64,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').notNullable()
		table.boolean('user_equipment').notNullable()
		table.string('user_color').defaultTo('blue')
		table.boolean('user_adminAuthorization').defaultTo(false).notNullable()
	})

	await knex.schema.createTable('workouts', (table) => {
		table.increments('workout_PK').primary()
		table.string('workout_name').notNullable()
		table.string('workout_focus').notNullable()
		table.integer('workout_difficulty').notNullable()
		table.boolean('workout_public').defaultTo(true).notNullable()
		table.integer('workout_user_FK')
		table.foreign('workout_user_FK').references('user_PK').inTable('users')
	})

	await knex.schema.createTable('exercises', (table) => {
		table.increments('exercise_PK').primary()
		table.string('exercise_name').notNullable()
		table.boolean('exercise_weighted').notNullable()
		table.boolean('exercise_advanced').notNullable()
		table.string('exercise_engagement').notNullable()
		table.string('exercise_type').notNullable()
		table.boolean('exercise_public').notNullable()
		table.integer('exercise_user_FK').notNullable()
		table.foreign('exercise_user_FK').references('user_PK').inTable('users')
	})

	await knex.schema.createTable('workoutExercises', (table) => {
		table.increments('workoutExercise_PK').primary()
		table.integer('workoutExercise_exercise_FK')
		table.foreign('workoutExercise_exercise_FK').references('exercise_PK').inTable('exercises')
		table.integer('workoutExercise_sets').defaultTo(0).notNullable()
		table.integer('workoutExercise_reps').defaultTo(0).notNullable()
		table.integer('workoutExercise_workout_FK')
		table.foreign('workoutExercise_workout_FK').references('workout_PK').inTable('workouts')
	})

	await knex.schema.createTable('schedules', (table) => {
		table.increments('schedule_PK').primary()
		table.integer('schedule_user_FK')
		table.foreign('schedule_user_FK').references('user_PK').inTable('users')
		table.integer('schedule_workout_FK')
		table.foreign('schedule_workout_FK').references('workout_PK').inTable('workouts')
		table.integer('schedule_day').defaultTo(0).notNullable()
	})
};

exports.down = async function (knex) {
	await knex.schema.dropTable('schedules')
	await knex.schema.dropTable('workoutExercises')
	await knex.schema.dropTable('exercises')
	await knex.schema.dropTable('workouts')
	await knex.schema.dropTable('users')
};