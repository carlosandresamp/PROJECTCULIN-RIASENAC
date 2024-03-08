import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const ReceitaSchema = new Schema({
  Titulo: { type: String, required: true },
  ingredientes: { type: String, required: true },
  modoDePreparo: { type: String, required: true },
  tempo: { type: Number, required: true },
  categoria: { type: [String], required: true }, 
  user: { type: Schema.Types.ObjectId, ref: 'User' }, 
  chef: { type: String }, 
  foto: { type: String },
  likes: { type: Number, default: 0 }, 
  video: { type: String },
});


export default model("Receita", ReceitaSchema);
