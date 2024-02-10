import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  senha: {
    type: String,
    required: true,
  },
  confirmarsenha: {
    type: String,
    required: true,
  },
  cpf: {
    type: Number,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
