const treatmentModel = require('../models/treatmentModel');
const HttpError = require('../utils/httpError');
const petModel = require("./petsController");

module.exports = {
    getAll: async function () {
        try {
            return await treatmentModel.getAll();
        }
        catch (err) {
            throw new HttpError(err.message, 500);
        }
    },

    getById: async function (id) {
        if (isNaN(parseInt(id))) throw new HttpError("ID must be an integer", 400);
        try {
            return await treatmentModel.getById(id);
        }
        catch (err) {
            throw new HttpError(err.message, 500);
        }
    },

    getByUser: async function (userId) {
        if (isNaN(parseInt(userId))) throw new HttpError("ID must be an integer", 400);
        try {
            const pets = await petModel.getByUser(userId);
            if (!pets || pets.length === 0) return [];
            const allTreatments = [];
            for (const pet of pets) {
                const treatments = await treatmentModel.getByPet(pet.id);
                allTreatments.push(...treatments);
            }
            return allTreatments;
        }
        catch (err) {
            throw new HttpError(err.message, 500);
        }
    },

    getByPet: async function (petId) {
        if (isNaN(parseInt(petId))) throw new HttpError("Pet ID must be an integer", 400);
        try {
            return await treatmentModel.getByPet(petId);
        }
        catch (err) {
            throw new HttpError(err.message, 500);
        }
    },

    insert: async function (treatment) {
        if (!treatment.petId || !treatment.type) {
            throw new HttpError("Pet ID and type must be provided", 400);
        }
        try {
            const newTreatment = new treatmentModel.Treatment(
                treatment.petId,
                treatment.type,
                treatment.dosage,
                treatment.description,
                treatment.visitId,
                treatment.medicationId
            );
            return await treatmentModel.insert(newTreatment);
        }
        catch (err) {
            throw new HttpError(err.message, 400);
        }
    },

    update: async function (treatment) {
        if (!treatment.id) throw new HttpError("Treatment ID must be provided", 400);
        try {
            const newTreatment = new treatmentModel.Treatment(
                treatment.petId,
                treatment.type,
                treatment.dosage,
                treatment.description,
                treatment.visitId,
                treatment.medicationId,
                treatment.id
            );
            return await treatmentModel.update(newTreatment);
        }
        catch (err) {
            throw new HttpError(err.message, 400);
        }
    },

    delete: async function (id) {
        if (isNaN(parseInt(id))) throw new HttpError("ID must be an integer", 400);
        try {
            return await treatmentModel.delete(id);
        }
        catch (err) {
            throw new HttpError(err.message, 400);
        }
    }
};
