const refreshModel = require('../models/refreshModel');
const userModel  = require('../models/userModel');
const HttpError  = require('../utils/httpError');
const bcrypt     = require('bcrypt');
const jwt        = require('jsonwebtoken');

module.exports = {
    getAccessToken: async function (email, password) {
        if (!email || !password) {
            throw new HttpError('Email and password must be provided', 400);
        }

        const user = await userModel.getByEmail(email);
        if (!user) {
            throw new HttpError('User with provided email does not exist', 401);
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new HttpError('Invalid password', 401);
        }

        const accessPayload = { id: user.id, email: user.email, type: "access" };
        const refreshPayload = { id: user.id, email: user.email, type: "refresh" };

        try {
            const accessToken = jwt.sign(
                accessPayload,
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            const refreshToken = jwt.sign(
                refreshPayload,
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );
            await refreshModel.insert(user.id, refreshToken);
            return {accessToken, refreshToken};
        } catch (err) {
            throw new HttpError(err.message, 500);
        }
    },

    refreshAccess: async function (refreshToken) {
        if (!refreshToken) {
            throw new HttpError("Refresh token must be provided", 400);
        }

        let decoded;

        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        }
        catch (err) {
            throw new HttpError("Invalid refresh token", 401);
        }

        const tokens = await refreshModel.getByToken(refreshToken);
        if (tokens.length < 1) {
            throw new HttpError("Invalid refresh token", 401);
        }

        const payload = { id: decoded.id, email: decoded.email, type: "access" };

        try {
            const accessToken = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            return accessToken;
        }
        catch (err) {
            throw new HttpError(err.message, 500);
        }

    },

    invalidateRefresh: async function (userId) {
        if (!userId) {
            throw new HttpError("User id must be provided!", 400);
        }
        try {
            await refreshModel.remove(userId);
        }
        catch (err) {
            throw new HttpError(err.message, 500);
        }
    }
};
