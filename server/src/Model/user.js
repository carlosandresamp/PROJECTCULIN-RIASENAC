import { Schema, model } from "mongoose";

const UserShema = new Schema({

    userID: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

})

export default new model('User', UserShema)