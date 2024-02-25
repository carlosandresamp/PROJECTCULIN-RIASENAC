import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
    categoryID: {
        type: String,
        required: true,
        unique: true
    },
    nameCategory: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Buffer, 
        contentType: String
    },
    recipes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Receita' 
        }
    ]
});

export default model('Category', CategorySchema);
