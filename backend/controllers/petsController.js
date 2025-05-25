const petModel = require('../models/petModel');
const HttpError = require('../utils/httpError');

module.exports = {
    getAll: async function () {
        try {
            return await petModel.getAll();
        }
        catch (err) {
            throw new HttpError(err.message, 500);
        }
    },

    getById: async function (id) {
        if (isNaN(parseInt(id))) throw new HttpError("ID must be an integer", 400);
        try {
            return await petModel.getById(id);
        }
        catch (err) {
            throw new HttpError(err.message, 500);
        }
    },

    getByUser: async function (userId) {
        if (isNaN(parseInt(userId))) throw new HttpError("ID must be an integer", 400);
        try {
            return await petModel.getByUser(userId);
        }
        catch (err) {
            throw new HttpError(err.message, 500);
        }
    },

    insert: async function (pet, userId) {
        if (!pet.name || !pet.species) {
            throw new HttpError("Pet name and species must be provided", 400);
        }
        if (isNaN(parseInt(userId))) throw new HttpError("ID must be an integer", 400);
        try {
            if (pet.birthday == "") pet.birthday = null; 
            else pet.birthday = new Date(pet.birthday);
            if (pet.breed == "") pet.breed = null;
            let newPet = new petModel.Pet(pet.name, pet.species, userId, pet.breed, pet.birthday, pet.imageId);
            return await petModel.insert(newPet);
        }
        catch (err) {
            throw new HttpError(err.message, 400);
        }
    },

    update: async function (pet) {
        if (!pet.id) {
            throw new HttpError("Pet ID must be provided", 400);
        }
        try {
            if (pet.birthday == "") pet.birthday = null; 
            else pet.birthday = new Date(pet.birthday);
            if (pet.breed == "") pet.breed = null;
            let newPet = new petModel.Pet(pet.name, pet.species, pet.userId, pet.breed, pet.birthday, pet.imageId, pet.id);
            return await petModel.update(newPet);
        }
        catch (err) {
            throw new HttpError(err.message, 400);
        }
    },

    delete: async function (id) {
        if (isNaN(parseInt(id))) throw new HttpError("ID must be an integer", 400);
        try {
            return await petModel.delete(id);
        }
        catch (err) {
            throw new HttpError(err.message, 400);
        }
    }
};
