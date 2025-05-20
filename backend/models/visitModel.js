const knex = require('../db/knex');

module.exports = {
    getAll: async function () {
        return await knex('veterinary_visits').select('*');
    },

    getById: async function (id) {
        return await knex('veterinary_visits').where({ id }).first();
    },

    getByUser: async function (userId) {
        return await knex('veterinary_visits').where({ userId }).select('*');
    },

    getByPet: async function (petId) {
        return await knex('veterinary_visits').where({ petId });
    },

    insert: async function (visit) {
        const [insertedId] = await knex('veterinary_visits').insert({
            petId: visit.petId,
            visitDate: visit.visitDate,
            visitTime: visit.visitTime,
            location: visit.location,
            notes: visit.notes
        });

        return await knex('veterinary_visits').where({ id: insertedId }).first();
    },

    update: async function (visit) {
        if (!visit.id) throw new Error('Visit ID is required for update');

        await knex('veterinary_visits')
            .where({ id: visit.id })
            .update({
                petId: visit.petId,
                visitDate: visit.visitDate,
                visitTime: visit.visitTime,
                location: visit.location,
                notes: visit.notes
            });

        return await knex('veterinary_visits').where({ id: visit.id }).first();
    },

    delete: async function (id) {
        return await knex('veterinary_visits').where({ id }).del();
    },

    Visit: class {
        id;
        petId;
        visitDate;
        visitTime;
        location;
        notes;

        constructor(petId, visitDate, visitTime, location, notes = null, id = null) {
            if (isNaN(parseInt(petId))) throw new Error("PetId must be an integer");
            if (!visitDate) throw new Error("VisitDate cannot be empty string");
            if (!visitTime) throw new Error("VisitTime cannot be empty string");
            if (!location) throw new Error("Location cannot be empty string");
            if (id !== null && isNaN(parseInt(id))) throw new Error("ID must be an integer");

            this.petId = petId;
            this.visitDate = visitDate;
            this.visitTime = visitTime;
            this.location = location;
            this.notes = notes;
            this.id = id;
        }
    }
};
