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


router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name, category } = req.body;
    const userId = req.user.id;

    if (!name || !category) {
        return res.status(400).json({ error: 'name and category are required' });
    }

    try {
        const updated = await knex('food')
            .where({ id, userId })
            .update({ name, category });

        if (!updated) {
            return res.status(404).json({ error: 'Food not found or not owned by user' });
        }

        return res.status(200).json({ id, name, category });
    } catch (err) {
        console.error('Error updating food:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const deleted = await knex('food')
            .where({ id, userId })
            .del();

        if (!deleted) {
            return res.status(404).json({ error: 'Food not found or not owned by user' });
        }

        res.json({});
        return res.status(204).send();
    } catch (err) {
        console.error('Error deleting food:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const foods = await knex('food')
            .select('id', 'name', 'category')
            .where({ userId });

        return res.status(200).json(foods);
    } catch (err) {
        console.error('Error fetching food:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const food = await knex('food')
            .where({ id, userId })
            .first();

        if (!food) {
            return res.status(404).json({ error: 'Food not found' });
        }

        return res.status(200).json(food);
    } catch (err) {
        console.error('Error fetching food by ID:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
