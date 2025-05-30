const imageModel = require('../models/imageModel');
const petModel = require('../models/petModel');
const HttpError = require('../utils/httpError');

module.exports = {
    getAll: async function () {
        try {
            const pets = await petModel.getAll();
            for (let pet of pets) {
                if (pet.imageId) {
                    let image = await imageModel.getById(pet.imageId);
                    if (!image) {
                        console.error("petsController: Error getting image from database");
                    }
                    else {
                        pet.image = image.content;
                    }
                }
            }
            return pets;
        }
        catch (err) {
            throw new HttpError(err.message, 500);
        }
    },

    getById: async function (id) {
        if (isNaN(parseInt(id))) throw new HttpError("ID must be an integer", 400);
        try {
            const pet = await petModel.getById(id);
            if (pet && pet.imageId) {
                let image = await imageModel.getById(pet.imageId);
                if (!image) {
                    console.error("petsController: Error getting image from database");
                }
                else {
                    pet.image = image.content;
                }
            }
            return pet;
        }
        catch (err) {
            throw new HttpError(err.message, 500);
        }
    },

    getByUser: async function (userId) {
        if (isNaN(parseInt(userId))) throw new HttpError("ID must be an integer", 400);
        try {
            const pets = await petModel.getByUser(userId);
            for (let pet of pets) {
                if (pet.imageId) {
                    let image = await imageModel.getById(pet.imageId);
                    if (!image) {
                        console.error("petsController: Error getting image from database");
                    }
                    else {
                        pet.image = image.content;
                    }
                }
            }
            return pets;

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
            if (pet.image) {
                let newImage = new imageModel.Image(pet.image.content);
                let insertedImage = await imageModel.insert(newImage);
                if (!insertedImage) throw new HttpError("Error inserting pet - failed to insert image", 500);
                delete pet.image;
                pet.imageId = insertedImage.id;
            }
            if (!pet.birthday) pet.birthday = null; 
            else pet.birthday = new Date(pet.birthday);
            if (!pet.breed) pet.breed = null;
            let newPet = new petModel.Pet(pet.name, pet.species, userId, pet.breed, pet.birthday, pet.imageId);
            return await petModel.insert(newPet);
        }
        catch (err) {
            if (pet.image && pet.imageId) await imageModel.delete(pet.imageId); // prevents unused images hanging in database
            throw new HttpError(err.message, 400);
        }
    },

    update: async function (pet) {
        if (!pet.id) {
            throw new HttpError("Pet ID must be provided", 400);
        }
        try {
            if (pet.image) {
                let newImage = new imageModel.Image(pet.image.content);
                let insertedImage = await imageModel.insert(newImage);
                if (!insertedImage) throw new HttpError("Error inserting pet - failed to insert image", 500);
                delete pet.image;
                pet.imageId = insertedImage.id;
            }
            if (!pet.birthday) pet.birthday = null; 
            else pet.birthday = new Date(pet.birthday);
            if (!pet.breed) pet.breed = null;
            let newPet = new petModel.Pet(pet.name, pet.species, pet.userId, pet.breed, pet.birthday, pet.imageId, pet.id);
            return await petModel.update(newPet);
        }
        catch (err) {
            if (pet.image && pet.imageId) await imageModel.delete(pet.imageId); // prevents unused images hanging in database
            throw new HttpError(err.message, 400);
        }
    },

    delete: async function (id) {
        if (isNaN(parseInt(id))) throw new HttpError("ID must be an integer", 400);
        try {
            const pet = await petModel.getById(id);
            if (pet.imageId) {
                await imageModel.delete(pet.imageId);
            }
            return await petModel.delete(id);
        }
        catch (err) {
            throw new HttpError(err.message, 400);
        }
    }
};
