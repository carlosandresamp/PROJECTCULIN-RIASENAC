import { Schema, model } from "mongoose";

const ReceitaShema = new Schema({
  Titulo: { type: String, required: true },
  nomeDoChef: { type: String, required: true },
  ingredientes: { type: String, required: true },
  modoDePreparo: { type: String, required: true },
  tempo: { type: Number, required: true },
  foto: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default model("Receita", ReceitaShema);
