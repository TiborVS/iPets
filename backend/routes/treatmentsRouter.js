const express = require('express');
const treatmentsController = require('../controllers/treatmentsController');
const treatmentsRouter = express.Router();

treatmentsRouter.get('/', async function (req, res) {
    try {
        const treatments = await treatmentsController.getAll();
        return res.status(200).json(treatments);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

treatmentsRouter.get('/:treatmentId', async function (req, res) {
    try {
        const treatment = await treatmentsController.getById(req.params.treatmentId);
        if (!treatment) return res.status(404).json({ error: "Treatment not found" });
        return res.status(200).json(treatment);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

treatmentsRouter.get('/user/:userId', async function (req, res) {
    try {
        const treatments = await treatmentsController.getByUser(req.params.userId);
        if (!treatments) return res.status(404).json({ error: "No treatments found" });
        return res.status(200).json(treatments);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

treatmentsRouter.get('/pet/:petId', async function (req, res) {
    try {
        const treatments = await treatmentsController.getByPet(req.params.petId);
        if (!treatments) return res.status(404).json({ error: "No treatments found" });
        return res.status(200).json(treatments);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

treatmentsRouter.post('/', async function (req, res) {
    if (!req.body.treatment) {
        return res.status(400).json({ error: "Treatment object is required!" });
    }
    try {
        const treatment = await treatmentsController.insert(req.body.treatment);
        return res.status(201).json(treatment);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

treatmentsRouter.put('/:treatmentId', async function (req, res) {
    if (!req.body.treatment) {
        return res.status(400).json({ error: "Treatment object missing in body" });
    }
    req.body.treatment.id = req.params.treatmentId;
    try {
        const treatment = await treatmentsController.update(req.body.treatment);
        if (!treatment) return res.status(404).json({ error: "Treatment not found" });
        return res.status(200).json(treatment);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

treatmentsRouter.delete('/:treatmentId', async function (req, res) {
    try {
        const treatment = await treatmentsController.getById(req.params.treatmentId);
        if (!treatment) return res.status(404).json({ error: "Treatment not found" });
        const deleted = await treatmentsController.delete(req.params.treatmentId);
        if (deleted == 0) return res.status(500).json({ error: "Error deleting treatment" });
        return res.status(200).json(treatment);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message });
    }
});

module.exports = treatmentsRouter;
