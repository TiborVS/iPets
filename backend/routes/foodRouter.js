const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const authenticateToken = require("../middleware/authenticateToken");

router.post('/', authenticateToken, async (req, res) => {
    const { name, category } = req.body;
    const userId = req.user.id;

    if (!name || !category || !userId) {
        return res.status(400).json({ error: 'name, category, and userId are required' });
    }

    if (!['FOOD', 'SNACK'].includes(category)) {
        return res.status(400).json({ error: 'Invalid category. Must be FOOD or SNACK' });
    }

    try {
        const [id] = await knex('food').insert({ name, category, userId });
        return res.status(201).json({ id, name, category, userId });
    } catch (err) {
        console.error('Error inserting food:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
