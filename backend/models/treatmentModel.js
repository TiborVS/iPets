const knex = require('../db/knex');

module.exports = {
    getAll: async function () {
        return await knex('medical_treatments').select('*');
    },

    getById: async function (id) {
        return await knex('medical_treatments').where({ id }).first();
    },

    getByUser: async function (userId) {
        return await knex('medical_treatments').where({ userId }).select('*');
    },

    getByPet: async function (petId) {
        return knex('medical_treatments')
            .join('medications', 'medical_treatments.medicationId', 'medications.id')
            .select(
                'medical_treatments.*',
                'medications.name as medicationName'
            )
            .where('medical_treatments.petId', petId);
    },

    insert: async function (treatment) {
        const [insertedId] = await knex('medical_treatments').insert({
            petId: treatment.petId,
            visitId: treatment.visitId || null,
            medicationId: treatment.medicationId || null,
            dosage: treatment.dosage,
            type: treatment.type,
            description: treatment.description
        });

        return await knex('medical_treatments').where({ id: insertedId }).first();
    },

    update: async function (treatment) {
        if (!treatment.id) throw new Error("Treatment ID is required for update");

        await knex('medical_treatments')
            .where({ id: treatment.id })
            .update({
                petId: treatment.petId,
                visitId: treatment.visitId || null,
                medicationId: treatment.medicationId || null,
                dosage: treatment.dosage,
                type: treatment.type,
                description: treatment.description
        });

        return await knex('medical_treatments').where({ id: treatment.id }).first();
    },

    delete: async function (id) {
        return await knex('medical_treatments').where({ id }).del();
    },

    Treatment: class {
        id;
        petId;
        visitId;
        medicationId;
        dosage;
        type;
        description;

        constructor(petId, type, dosage = null, description = null, visitId = null, medicationId = null, id = null) {
            if (isNaN(parseInt(petId))) throw new Error("PetId must be an integer");
            if (!type) throw new Error("Type cannot be empty string");
            if (visitId !== null && isNaN(parseInt(visitId))) throw new Error("VisitId must be an integer");
            if (medicationId !== null && isNaN(parseInt(medicationId))) throw new Error("MedicationId must be an integer");
            if (id !== null && isNaN(parseInt(id))) throw new Error("ID must be an integer");

            this.petId = petId;
            this.type = type;
            this.dosage = dosage;
            this.description = description;
            this.visitId = visitId;
            this.medicationId = medicationId;
            this.id = id;
        }
    }
};
