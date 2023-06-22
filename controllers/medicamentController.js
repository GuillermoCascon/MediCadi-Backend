import {json} from 'express'
import Medicament from '../models/Medicament.js'

const getMedicament = async (req, res) => {
    const medicament = await Medicament.findById(req.params.id)
    if(!medicament){
        return res.status(404).json({msg: 'Medicamento no encontrado'})
    }
    if(medicament.user._id.toString() !== req.user._id.toString()){
        return res.json({msg: 'Acción no válida'})
    }
    return res.json(medicament);
}

const getMedicaments = async (req, res) => {
    const medicaments = await Medicament.find()
        .where('user')
        .equals(req.user)
    res.json(medicaments)
}

const addMedicament = async (req, res) => {
    const medicament = new Medicament(req.body)
    medicament.user = req.user._id
    try {
        const medicamentStored = await medicament.save();
        res.json(medicamentStored);
    } catch (error) {
        console.log(error)
    }
}

const updateMedicament = async (req, res) => {
    const medicament = await Medicament.findById(req.params.id)
    const {name, caducity, cuantity} = req.body;
    if(!medicament){
        return res.status(404).json({msg: 'Medicamento no encontrado'})
    }
    if(medicament.user._id.toString() !== req.user._id.toString()){
        return res.json({msg: 'Acción no válida'})
    }
    if(name) medicament.name = name;
    if(caducity) medicament.caducity = caducity;
    if(cuantity) medicament.cuantity = cuantity;
    try {
       const updatedMedicament = await medicament.save()
       return res.json(updatedMedicament)
    } catch (error) {
        console.log(error)
    }

}

const removeMedicament = async (req, res) => {
    const medicament = await Medicament.findById(req.params.id)
    if(!medicament){
        return res.status(404).json({msg: 'Medicamento no encontrado'})
    }
    if(medicament.user._id.toString() !== req.user._id.toString()){
        return res.json({msg: 'Acción no válida'})
    }
    try {
        await medicament.deleteOne();
        return res.json({msg: 'Medicamento eliminado correctamente'})
    } catch (error) {
        console.log(error)
    }
}

export {
    getMedicament,
    getMedicaments,
    addMedicament,
    updateMedicament,
    removeMedicament
}