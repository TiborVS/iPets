const knex = require('./knex');

async function setupDb() {

    const usersExist = await knex.schema.hasTable('users');
    if (!usersExist) {
        await knex.schema.createTable('users', (table) => {
            table.increments('id').primary();
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
        });
        console.log('Created table: users');
    }

    const petsExist = await knex.schema.hasTable('pets');
    if (!petsExist) {
        await knex.schema.createTable('pets', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('species').notNullable();
            table.string('breed');
            table.string('birthday'); // sqlite does not support date types, will use ISO strings (YYYY-MM-DD), e.g. 2024-03-28
            table.integer('imageId');
            table.integer('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
        });
        console.log('Created table: pets');
    }

    const visitsExist = await knex.schema.hasTable('veterinary_visits');
    if (!visitsExist) {
        await knex.schema.createTable('veterinary_visits', (table) => {
            table.increments('id').primary();
            table.integer('petId').notNullable().references('id').inTable('pets').onDelete('CASCADE');
            table.date('visitDate').notNullable();
            table.time('visitTime').notNullable();
            table.string('location').notNullable();
            table.string('notes');
        });
        console.log('Created table: veterinary_visits');
    }

    const treatmentsExist = await knex.schema.hasTable('medical_treatments');
    if (!treatmentsExist) {
        await knex.schema.createTable('medical_treatments', (table) => {
            table.increments('id').primary();
            table.integer('petId').notNullable().references('id').inTable('pets').onDelete('CASCADE');
            table.integer('visitId').nullable().references('id').inTable('veterinary_visits').onDelete('SET NULL');
            table.integer('medicationId').nullable().references('id').inTable('medications').onDelete('SET NULL');
            table.string('dosage');
            table.string('type').notNullable();
            table.string('description');
        });
        console.log('Created table: medical_treatments');
    }

    const medicationsExist = await knex.schema.hasTable('medications');
    if (!medicationsExist) {
        await knex.schema.createTable('medications', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable().unique();
            table.string('side_effects');
            table.string('manufacturer');
            table.string('description');
        });
        console.log('Created table: medications');
    }

    const refreshTokensExist = await knex.schema.hasTable('refresh_tokens');
    if (!refreshTokensExist) {
        await knex.schema.createTable('refresh_tokens', (table) => {
            table.increments('id').primary();
            table.string('token').notNullable();
            table.integer('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
        });
        console.log('Created table: refresh_tokens');
    }

    await knex.destroy();
    console.log('Database setup complete.');
}

setupDb().catch((err) => {
    console.error('Error setting up database:', err);
    process.exit(1);
});
