import mongoose from "mongoose";

const medicamentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    caducity: {
        type: String,
        required: true
    },
    
    cuantity: {
        type: Number,
        required: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }

})

const Medicament = mongoose.model('Medicament', medicamentSchema);
export default Medicament;