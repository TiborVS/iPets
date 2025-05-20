const knex = require('../db/knex');

module.exports = {
    getAll: async function () {
        return await knex('medications').select('*');
    },

    getById: async function (id) {
        return await knex('medications').where({ id }).first();
    },

    insert: async function (medication) {
        const [insertedId] = await knex('medications').insert({
            name: medication.name,
            side_effects: medication.side_effects,
            manufacturer: medication.manufacturer,
            description: medication.description
        });

        return await knex('medications').where({ id: insertedId }).first();
    },

    update: async function (medication) {
        if (!medication.id) throw new Error("Medication ID is required for update");

        await knex('medications').where({ id: medication.id }).update({
            name: medication.name,
            side_effects: medication.side_effects,
            manufacturer: medication.manufacturer,
            description: medication.description
        });

        return await knex('medications').where({ id: medication.id }).first();
    },

    delete: async function (id) {
        return await knex('medications').where({ id }).del();
    },

    Medication: class {
        id;
        name;
        side_effects;
        manufacturer;
        description;

        constructor(name, side_effects = null, manufacturer = null, description = null, id = null) {
            if (!name) throw new Error("Name cannot be empty string");
            if (id !== null && isNaN(parseInt(id))) throw new Error("id must be an integer");

            this.name = name;
            this.side_effects = side_effects;
            this.manufacturer = manufacturer;
            this.description = description;
            this.id = id;
        }
    }
};
