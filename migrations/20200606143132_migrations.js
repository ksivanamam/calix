exports.up = async function (knex) {
	await knex.schema.createTable('users', (table) => {
		table.increments('userPK')
		table.string('username').notNullable().unique()
		table.string('password').notNullable()
		table.string('email').notNullable().unique()
		table.string('firstname').notNullable()
		table.string('lastname').notNullable()
		table.integer('age').notNullable()
		table.integer('height').notNullable()
		table.integer('weight').notNullable()
		table.boolean('equipment').notNullable()
		table.string('color').defaultTo('blue').notNullable()
		table.boolean('admin').defaultTo(false).notNullable()
	})

	await knex.schema.createTable('workouts', (table) => {
		table.increments('workoutPK')
		table.string('name').notNullable()
		table.string('focus').notNullable()
		table.integer('difficulty').notNullable()
		table.boolean('public').defaultTo(true).notNullable()
	})

	await knex.schema.createTable('exerciseLibrary', (table) => {
		table.increments('exerciseLibraryPK')
		table.string('name').notNullable()
		table.boolean('weighted').notNullable()
		table.boolean('advanced').notNullable()
		table.string('engagement').notNullable()
		table.string('type').notNullable()
	})

	await knex.schema.createTable('workoutExercises', (table) => {
		table.increments('workoutExercisePK')
		table.integer('exerciseLibraryFK')
		table.foreign('exerciseLibraryFK').references('exerciseLibraryPK').inTable('exerciseLibrary')
		table.integer('sets').defaultTo(0).notNullable()
		table.integer('reps').defaultTo(0).notNullable()
		table.integer('workoutFK')
		table.foreign('workoutFK').references('workoutPK').inTable('workouts')
	})

	await knex.schema.createTable('plans', (table) => {
		table.increments('planPK')
		table.integer('userFK')
		table.foreign('userFK').references('userPK').inTable('users')
		table.integer('workoutFK')
		table.foreign('workoutFK').references('workoutPK').inTable('workouts')
		table.integer('day').defaultTo(0).notNullable()
	})
};

exports.down = async function (knex) {
	await knex.schema.dropTable('plans')
	await knex.schema.dropTable('workoutExercises')
	await knex.schema.dropTable('exerciseLibrary')
	await knex.schema.dropTable('workouts')
	await knex.schema.dropTable('users')
};