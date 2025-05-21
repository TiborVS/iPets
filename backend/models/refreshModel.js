const knex = require('../db/knex');

module.exports = {
    getByUserId: async function (userId) {
        return await knex('refresh_tokens').where({userId});
    },

    getByToken: async function (refreshToken) {
        return await knex('refresh_tokens').where({ token: refreshToken });
    },

    insert: async function (userId, refreshToken) {
        const [insertedId] = await knex('refresh_tokens').insert(
            {
                userId: userId,
                token: refreshToken
            }
        );
        return await knex('refresh_tokens').where({ id: insertedId }).first();
    }
}
