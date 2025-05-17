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
            table.date('birthday');
            table.integer('imageId');
            table.integer('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
        });
        console.log('Created table: pets');
    }

    await knex.destroy();
    console.log('Database setup complete.');
}

setupDb().catch((err) => {
    console.error('Error setting up database:', err);
    process.exit(1);
});
