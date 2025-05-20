const express = require('express');
const medicationsController = require('../controllers/medicationsController');
const medicationsRouter = express.Router();

medicationsRouter.get('/', async function (req, res) {
    try {
        const medications = await medicationsController.getAll();
        return res.status(200).json(medications);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

medicationsRouter.get('/:medicationId', async function (req, res) {
    try {
        const medication = await medicationsController.getById(req.params.medicationId);
        if (!medication) return res.status(404).json({ error: "Medication not found" });
        return res.status(200).json(medication);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

medicationsRouter.post('/', async function (req, res) {
    if (!req.body.medication) {
        return res.status(400).json({ error: "Medication object is required!" });
    }
    try {
        const medication = await medicationsController.insert(req.body.medication);
        return res.status(201).json(medication);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

medicationsRouter.put('/:medicationId', async function (req, res) {
    if (!req.body.medication) {
        return res.status(400).json({ error: "Medication object missing in body" });
    }
    req.body.medication.id = req.params.medicationId;
    try {
        const medication = await medicationsController.update(req.body.medication);
        if (!medication) return res.status(404).json({ error: "Medication not found" });
        return res.status(200).json(medication);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

medicationsRouter.delete('/:medicationId', async function (req, res) {
    try {
        const medication = await medicationsController.getById(req.params.medicationId);
        if (!medication) return res.status(404).json({ error: "Medication not found" });
        const deleted = await medicationsController.delete(req.params.medicationId);
        if (deleted == 0) return res.status(500).json({ error: "Error deleting medication" });
        return res.status(200).json(medication);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

module.exports = medicationsRouter;
