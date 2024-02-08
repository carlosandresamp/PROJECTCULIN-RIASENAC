import { Schema, model } from "mongoose";

const CommentSchema = new Schema({

    Usuario: {
        type: String,
        required: true
    },
    Comentario: {
        type: String,
        required: true
    },
    Data: {
        type: Date,
        default: Date.now(),
        required: true
    }

})

export default new model('Comment', CommentSchema)