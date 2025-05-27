const knex = require('../db/knex');

module.exports = {
    getById: async function (id) {
        return await knex('images').where({ id }).first();
    },

    insert: async function (image) {
        const [insertedId] = await knex('images').insert({
            content: image.content
        });

        return await knex('images').where({ id: insertedId }).first();
    },

    update: async function (image) {
        if (!image.id) throw new Error('Image ID is required for update');

        await knex('images')
            .where({ id: image.id })
            .update({
                content: image.content,
            });

        return await knex('images').where({ id: image.id }).first();
    },

    delete: async function (id) {
        return await knex('images').where({ id }).del();
    },

    Image: class {
        id;
        content;

        constructor(content, id = null) {
            if (!content) throw new Error("Content cannot be empty");
            if (id !== null && isNaN(parseInt(id))) throw new Error("ID must be an integer");
            this.id = id;
            this.content = content;
        }
    }
}