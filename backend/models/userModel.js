const knex = require('../db/knex');

module.exports = {
    getAll: async function () {
        return await knex('users').select('*');
    },

    getById: async function (id) {
        return await knex('users').where({ id }).first();
    },

    insert: async function (user) {
        const [insertedId] = await knex('users').insert({
            email: user.email,
            password: user.password
        });

        return await knex('users').where({ id: insertedId }).first();
    },

    update: async function (user) {
        if (!user.id) throw new Error('User ID is required for update');

        await knex('users')
            .where({ id: user.id })
            .update({
                email: user.email,
                password: user.password
            });

        return await knex('users').where({ id: user.id }).first();
    },

    delete: async function (id) {
        return await knex('users').where({ id }).del();
    },

    User: class {
        id;
        email;
        password;

        constructor(email, password, id = null) {
            if (!email) throw new Error("Email cannot be empty");
            if (!password) throw new Error("Password cannot be empty");
            if (id !== null && isNaN(parseInt(id))) throw Error("ID must be an integer");
            this.email = email;
            this.password = password;
            this.id = id;
        }
    }
};
