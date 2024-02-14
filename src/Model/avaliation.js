import { Schema, model } from "mongoose";

const AvaliationSchema = new Schema({

    Usuario: {
        type: String,
        required: true
    },
    Avaliacao: {
        type: Number,
        required: true
    },
    Data: {
        type: Date,
        default: Date.now(),
        required: true
    }

})

export default new model('Avaliation', AvaliationSchema)