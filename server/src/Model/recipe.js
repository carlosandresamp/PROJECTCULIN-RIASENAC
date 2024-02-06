import { Schema, model } from "mongoose";

const RecipeShema = new Schema({

    Name: {
        type: String,
        required: true
    },

    Description: {
        type: String,
        required: true
    },

    NomeDoChef: {
        type: String,
        required: true
    },

    Ingredientes: {
        type: String,
        required: true
    },

    ModoDePreparo: {
        type: String,
        required: true
    },

    TempoDePreparo: {
        type: String,
        required: true
    },

    Rendimento: {
        type: String,
        required: true
    },

    DataPublicacao: {
        type: Date,
        default: Date.now(),
        required: true
    },

    Image: {
        type: String,
    },


},{toJSON: {
    virtuals: true
}})



RecipeShema.virtual('Image-ft').get(function(){
    return `http://localhost:3333/files/${this.Image}`
})

export default new model('Recipe', RecipeShema)
