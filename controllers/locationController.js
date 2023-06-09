import Location from '../models/Location.js'
import {json} from 'express'

const addLocation = async (req, res) => {
    const location = new Location(req.body)
    location.center = req.center._id
    try {
        const locationStored = await location.save();
        res.json(locationStored)
    } catch (error) {
        console.log(error)
    }
}

const getLocations = async (req, res) => {
    const locations = await Location.find()
        .where('user')
        .equals(req.user)
    res.json(locations)
}

const getLocation = async (req, res) => {
    const location = await Location.findById(req.params.id)
    if(!location){
        return res.status(404).json({msg: 'Lugar no encontrado'})
    }
    if(location.user._id.toString() !== req.user._id.toString()){
        return res.json({msg: 'Acción no válida'})
    }

    return res.json(location)
}

const updateLocation = async (req, res) => {
    const location = await Location.findById(req.params.id)
    const {name} = req.body
    if(!location){
        return res.status(404).json({msg: 'Lugar no encontrado'});
    }
    if(location.user._id.toString() !== req.user._id.toString()){
        return res.json({msg: 'Acción no válida'})
    }
    if(name) location.name = name
    try {
        const updatedLocation = await location.save()
        return res.json(updateLocation)
    } catch (error) {
        console.log(error)
    }
}

const removeLocation = async (req, res) => {
    const location = await Location.findById(req.params.id)
    if(!location){
        return res.status(404).json({msg: 'Lugar no encontrado'});
    }
    if(location.user._id.toString() !== req.user._id.toString()){
        return res.json({msg: 'Acción no válida'})
    }
    try {
        await location.deleteOne()
        return res.json({msg: 'Lugar eliminado'})
    } catch (error) {
        console.log(error)
    }
}

export {addLocation, getLocation, getLocations, updateLocation, removeLocation}