const visitModel = require('../models/visitModel');
const HttpError = require('../utils/httpError');
const petModel = require("../models/petModel");

module.exports = {
    getAll: async function () {
        try {
            return await visitModel.getAll();
        }
        catch (err) {
            throw new HttpError(err.message, 500);
        }
    },

    getById: async function (id) {
        if (isNaN(parseInt(id))) throw new HttpError("ID must be an integer", 400);
        try {
            return await visitModel.getById(id);
        }
        catch (err) {
            throw new HttpError(err.message, 500);
        }
    },

    getByUser: async function (userId) {
        if (isNaN(parseInt(userId))) throw new HttpError("ID must be an integer", 400);
        try {
            const pets = await petModel.getByUser(userId);
            if (!pets || pets.length === 0) return []; // uporabnik nima ljubljenčkov
            const allVisits = [];
            for (const pet of pets) {
                const visits = await visitModel.getByPet(pet.id);
                allVisits.push(...visits);
            }
            return allVisits;
        }
        catch (err) {
            throw new HttpError(err.message, 500);
        }
    },

    getByPet: async function (petId) {
        if (isNaN(parseInt(petId))) throw new HttpError("Pet ID must be an integer", 400);
        try {
            return await visitModel.getByPet(petId);
        }
        catch (err) {
            throw new HttpError(err.message, 500);
        }
    },

    insert: async function (visit) {
        try {
            let newVisit = new visitModel.Visit(
                visit.petId,
                visit.visitDate,
                visit.visitTime,
                visit.location,
                visit.notes
            );
            return await visitModel.insert(newVisit);
        } catch (err) {
            throw new HttpError(err.message, 400);
        }
    },

    update: async function (visit) {
        if (!visit.id) throw new HttpError("Visit ID must be provided", 400);
        try {
            let updated = new visitModel.Visit(
                visit.petId,
                visit.visitDate,
                visit.visitTime,
                visit.location,
                visit.notes,
                visit.id
            );
            return await visitModel.update(updated);
        } catch (err) {
            throw new HttpError(err.message, 400);
        }
    },

    delete: async function (id) {
        if (isNaN(parseInt(id))) throw new HttpError("ID must be an integer", 400);
        try {
            return await visitModel.delete(id);
        }
        catch (err) {
            throw new HttpError(err.message, 400);
        }
    }
};
