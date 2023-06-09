import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';
import { addLocation, getLocation, getLocations, removeLocation, updateLocation } from '../controllers/locationController.js';
const router = express.Router();

router.route('/')
    .post(checkAuth, addLocation)
    .get(checkAuth, getLocations)

router.route('/:id')
    .get(checkAuth, getLocation)
    .put(checkAuth, updateLocation)
    .delete(checkAuth, removeLocation)

export default router