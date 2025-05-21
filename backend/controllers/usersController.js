const userModel = require('../models/userModel');
const HttpError = require('../utils/httpError');
const bcrypt = require('bcrypt');

module.exports = {
    getAll: async function () {
        return await userModel.getAll();
    },

    getById: async function (id) {
        if (isNaN(parseInt(id))) throw new HttpError("ID must be an integer", 400);
        return await userModel.getById(id);
    },

    insert: async function (user) {
        if (!user.email || !user.password) {
            throw new HttpError("Email and password must be provided", 400);
        }
        let existingUser = await userModel.getByEmail(user.email);
        if (existingUser) throw new HttpError("User with that email already exists", 400);
        try {
            let encryptedPassword = await bcrypt.hash(user.password, 10);
            let newUser = new userModel.User(user.email, encryptedPassword);
            return await userModel.insert(newUser);
        }
        catch (err) {
            throw new HttpError(err.message, 400);
        }
    },

    update: async function (user) {
        if (!user.id) {
            throw new HttpError("User ID must be provided", 400);
        }
        if (!user.password) {
            throw new HttpError("Password must be provided", 400);
        }
        try {
            let encryptedPassword = await bcrypt.hash(user.password, 10);
            let newUser = new userModel.User(user.email, encryptedPassword, user.id);
            return await userModel.update(newUser);
        }
        catch (err) {
            throw new HttpError(err.message, 400);
        }
    },

    delete: async function (id) {
        if (isNaN(parseInt(id))) throw new HttpError("ID must be an integer", 400);
        return await userModel.delete(id);
    }
};
