const express = require('express');
const visitsController = require('../controllers/visitsController');
const visitsRouter = express.Router();

visitsRouter.get('/', async function (req, res) {
    try {
        const visits = await visitsController.getAll();
        return res.status(200).json(visits);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

visitsRouter.get('/:visitId', async function (req, res) {
    try {
        const visit = await visitsController.getById(req.params.visitId);
        if (!visit) return res.status(404).json({ error: "Visit not found" });
        return res.status(200).json(visit);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

visitsRouter.get('/user/:userId', async function (req, res) {
    try {
        const visits = await visitsController.getByUser(req.params.userId);
        if (!visits) return res.status(404).json({ error: "Visit not found" });
        return res.status(200).json(visits);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message })
    }
});

visitsRouter.get('/pet/:petId', async function (req, res) {
    try {
        const visits = await visitsController.getByPet(req.params.petId);
        if (!visits) return res.status(404).json({ error: "Visit not found" });
        return res.status(200).json(visits);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

visitsRouter.post('/', async function (req, res) {
    if (!req.body.visit) {
        return res.status(400).json({ error: "Visit object is required!" });
    }
    try {
        const visit = await visitsController.insert(req.body.visit);
        return res.status(201).json(visit);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

visitsRouter.put('/:visitId', async function (req, res) {
    if (!req.body.visit) {
        return res.status(400).json({ error: "Visit object missing in body" });
    }
    req.body.visit.id = req.params.visitId;
    try {
        const visit = await visitsController.update(req.body.visit);
        if (!visit) return res.status(404).json({ error: "Visit not found" });
        return res.status(200).json(visit);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

visitsRouter.delete('/:visitId', async function (req, res) {
    try {
        const visit = await visitsController.getById(req.params.visitId);
        if (!visit) return res.status(404).json({ error: "Visit not found" });
        const deleted = await visitsController.delete(req.params.visitId);
        if (deleted == 0) return res.status(500).json({ error: "Error deleting visit" });
        return res.status(200).json(visit);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

module.exports = visitsRouter;
