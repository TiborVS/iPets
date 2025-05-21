const express = require('express');
const authController = require('../controllers/authController');
const authRouter = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

authRouter.post('/token', async (req, res) => {
    const { email, password } = req.body;

    try {
        const tokens = await authController.getAccessToken(email, password);
        res.status(200).json(tokens);
    } catch (err) {
        res.status(err.httpStatus).json({error: err.message});
    }
});

authRouter.post('/refresh', async (req, res) => {
    if (req.body) {
        const refreshToken = req.body.refreshToken;
        try {
            const accessToken = await authController.refreshAccess(refreshToken);
            return res.status(200).json({accessToken});
        } catch (err) {
            return res.status(err.httpStatus).json({error: err.message});
        }
    }
    else return res.status(401).json({error: "Token not provided"});
});

authRouter.post('/logout', authenticateToken, async (req, res) => {
    const user = req.user;
    try {
        await authController.invalidateRefresh(user.id);
        res.status(200).json({message: "Successfully logged out."});
    }
    catch (err) {
        res.status(err.httpStatus).json({error: err.message});
    }
})

module.exports = authRouter;
