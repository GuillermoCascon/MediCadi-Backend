import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';
import { addMedicament, getMedicament, getMedicaments, removeMedicament, updateMedicament } from '../controllers/medicamentController.js';
const router = express.Router();

router.route('/')
    .post(checkAuth, addMedicament)
    .get(checkAuth, getMedicaments)

router.route('/:id')
    .get(checkAuth, getMedicament)
    .put(checkAuth, updateMedicament)
    .delete(checkAuth, removeMedicament)

export default router