const express = require('express');
const usersController = require('../controllers/usersController');
const authenticateToken = require('../middleware/authenticateToken');
const usersRouter = express.Router();

usersRouter.get('/', async function (req, res) {
    try {
        const users = await usersController.getAll();
        return res.status(200).json(users);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

usersRouter.get('/:userId', authenticateToken, async function (req, res) {
    if (req.params.userId !== req.user.id) return res.status(403).json({error: "Cannot access this user."}); 
    try {
        const user = await usersController.getById(req.params.userId);
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

usersRouter.post('/', async function (req, res) {
    if (!req.body.user) {
        return res.status(400).json({ error: "User object is required!" });
    }
    try {
        const user = await usersController.insert(req.body.user);
        return res.status(201).json(user);
    } 
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

usersRouter.put('/:userId', authenticateToken, async function (req, res) {
    if (req.params.userId !== req.user.id) return res.status(403).json({error: "Cannot access this user."}); 
    if (!req.body.user) {
        return res.status(400).json({ error: "User object missing in body" });
    }
    req.body.user.id = req.params.userId;
    try {
        const user = await usersController.update(req.body.user);
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.status(200).json(user);
    } catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

usersRouter.delete('/:userId', authenticateToken, async function (req, res) {
    if (req.params.userId !== req.user.id) return res.status(403).json({error: "Cannot access this user."}); 
    try {
        const user = await usersController.getById(req.params.userId);
        if (!user) return res.status(404).json({ error: "User not found" });
        const deleted = await usersController.delete(req.params.userId);
        if (deleted == 0) {
            return res.status(500).json({ error: "Error deleting user" });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

module.exports = usersRouter;
