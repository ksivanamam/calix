exports.up = async function (knex) {
	await knex.schema.createTable('users', (table) => {
		table.increments('user_PK').primary()
		table.string('user_username').notNullable().unique()
		table.string('user_password').notNullable()
		table.string('user_email').notNullable().unique()
		table.string('user_firstname').notNullable()
		table.string('user_lastname').notNullable()
		table.integer('user_yearOfBirth').notNullable()
		table.integer('user_height').notNullable()
		table.integer('user_weight').notNullable()
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

	await knex.schema.createTable('plans', (table) => {
		table.increments('plan_PK').primary()
		table.integer('plan_user_FK')
		table.foreign('plan_user_FK').references('user_PK').inTable('users')
		table.integer('plan_workout_FK')
		table.foreign('plan_workout_FK').references('workout_PK').inTable('workouts')
		table.integer('plan_day').defaultTo(0).notNullable()
	})
};

exports.down = async function (knex) {
	await knex.schema.dropTable('plans')
	await knex.schema.dropTable('workoutExercises')
	await knex.schema.dropTable('exercises')
	await knex.schema.dropTable('workouts')
	await knex.schema.dropTable('users')
};