const knex = require('../db/knex');

module.exports = {
    getAll: async function () {
        return await knex('pets').select('*');
    },

    getById: async function (id) {
        return await knex('pets').where({ id }).first();
    },

    getByUser: async function (userId) {
        return await knex('pets').where({ userId }).select('*');
    },

    insert: async function (pet) {
        const [insertedId] = await knex('pets').insert({
            name: pet.name,
            species: pet.species,
            breed: pet.breed,
            birthday: pet.birthday,
            imageId: pet.imageId,
            userId: pet.userId
        });

        return await knex('pets').where({ id: insertedId }).first();
    },

    update: async function (pet) {
        if (!pet.id) throw new Error('Pet ID is required for update');

        await knex('pets')
            .where({ id: pet.id })
            .update({
                name: pet.name,
                species: pet.species,
                breed: pet.breed,
                birthday: pet.birthday,
                imageId: pet.imageId,
                userId: pet.userId
            });

        return await knex('pets').where({ id: pet.id }).first();
    },

    delete: async function (id) {
        return await knex('pets').where({ id }).del();
    },

    Pet: class {
        id;
        name;
        species;
        breed;
        birthday;
        imageId;
        userId;

        constructor(name, species, userId, breed = null, birthday = null, imageId = null, id = null) {
            if (!name) throw new Error("Name cannot be empty string");
            if (!species) throw new Error("Species cannot be empty string");
            if (isNaN(parseInt(userId))) throw new Error("UserId must be an integer");
            if (breed !== null && !breed) throw new Error("Breed cannot be empty string");
            if (birthday !== null && !(birthday instanceof Date)) throw new Error("Birtday must be date object");
            if (imageId !== null && isNaN(parseInt(imageId))) throw new Error("ImageId must be an integer");
            if (id !== null && isNaN(parseInt(id))) throw new Error("ID must be an integer");
            this.name = name;
            this.species = species;
            this.userId = userId;
            this.breed = breed;
            this.birthday = birthday.toISOString().split('T')[0]; // converts date type to ISO date string (YYYY-MM-DD)
            this.imageId = imageId;
            this.id = id;
        }
    }
}