const express = require('express');
const petsController = require('../controllers/petsController');
const petsRouter = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

petsRouter.get('/', async function (req, res) {
    try {
        const pets = await petsController.getAll();
        return res.status(200).json(pets);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message })
    }
});

petsRouter.get('/:petId', authenticateToken, async function (req, res) {
    try {
        const pet = await petsController.getById(req.params.petId);
        if (!pet) return res.status(404).json({ error: "Pet not found" });
        if (pet.userId !== req.user.id) return res.status(403).json({error: "Not allowed to access this pet."});
        return res.status(200).json(pet);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message })
    }
});

petsRouter.get('/user/:userId', async function (req, res) {
    try {
        const pet = await petsController.getByUser(req.params.userId);
        if (!pet) return res.status(404).json({ error: "Pet not found" });
        if (pet.userId !== req.user.id) return res.status(403).json({error: "Not allowed to access this user's pets."});
        return res.status(200).json(pet);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message })
    }
});

petsRouter.post('/', authenticateToken, async function (req, res) {
    if (!req.body.pet) {
        return res.status(400).json({ error: "Body must contain pet data!" });
    }
    try {
        const pet = await petsController.insert(req.body.pet, req);
        return res.status(201).json(pet);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message })
    }
});

petsRouter.put('/:petId', authenticateToken, async function (req, res) {
    if (!req.body.pet) {
        return res.status(400).json({ error: "Pet object missing in body" });
    }
    req.body.pet.id = req.params.petId;
    try {
        const pet = await petsController.update(req.body.pet);
        if (pet.userId !== req.user.id) return res.status(403).json({error: "Not allowed to access this pet."});
        if (!pet) return res.status(404).json({ error: "Pet not found" });
        return res.status(200).json(pet);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message })
    }
});

petsRouter.delete('/:petId', authenticateToken, async function (req, res) {
    try {
        const pet = await petsController.getById(req.params.petId);
        if (!pet) return res.status(404).json({ error: "Pet not found" });
        if (pet.userId !== req.user.id) return res.status(403).json({error: "Not allowed to access this pet."});
        const deleted = await petsController.delete(req.params.petId);
        if (deleted == 0) {
            return res.status(500).json({ error: "Error deleting pet" });
        }
        return res.status(200).json(pet);
    }
    catch (err) {
        return res.status(err.httpStatus).json({ error: err.message })
    }
})

module.exports = petsRouter;
