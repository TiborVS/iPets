const medicationModel = require('../models/medicationModel');
const HttpError = require('../utils/httpError');

module.exports = {
    getAll: async function () {
        try {
            return await medicationModel.getAll();
        }
        catch (err) {
            throw new HttpError(err.message, 500);
        }
    },

    getById: async function (id) {
        if (isNaN(parseInt(id))) throw new HttpError("ID must be an integer", 400);
        try {
            return await medicationModel.getById(id);
        }
        catch (err) {
            throw new HttpError(err.message, 500);
        }
    },

    insert: async function (medication) {
        if (!medication.name) {
            throw new HttpError("Medication name is required", 400);
        }
        try {
            const newMedication = new medicationModel.Medication(
                medication.name,
                medication.side_effects,
                medication.manufacturer,
                medication.description
            );
            return await medicationModel.insert(newMedication);
        }
        catch (err) {
            throw new HttpError(err.message, 400);
        }
    },

    update: async function (medication) {
        if (!medication.id) throw new HttpError("Medication ID must be provided", 400);
        try {
            const newMedication = new medicationModel.Medication(
                medication.name,
                medication.side_effects,
                medication.manufacturer,
                medication.description,
                medication.id
            );
            return await medicationModel.update(newMedication);
        }
        catch (err) {
            throw new HttpError(err.message, 400);
        }
    },

    delete: async function (id) {
        if (isNaN(parseInt(id))) throw new HttpError("ID must be an integer", 400);
        try {
            return await medicationModel.delete(id);
        }
        catch (err) {
            throw new HttpError(err.message, 400);
        }
    }
};
