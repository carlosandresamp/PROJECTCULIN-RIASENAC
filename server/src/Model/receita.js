import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const ReceitaSchema = new Schema({
  Titulo: { type: String, required: true },
  ingredientes: { type: String, required: true },
  modoDePreparo: { type: String, required: true },
  tempo: { type: Number, required: true },
  foto: { type: String },
  user: { type: Schema.Types.ObjectId }, // Adicionado campo de referência ao usuário
});

export default model("Receita", ReceitaSchema);
