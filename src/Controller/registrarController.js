import Usuario from "../Model/User";

class RegistrarUsuarioController {
  async store(req, res) {
    const { nome, email, senha, confirmarsenha, cpf } = req.body;

    const usuarioExiste = await Usuario.findOne({ email });
    console.log(usuarioExiste);
    if (usuarioExiste) {
      return res.status(409).send("Usuário já existe");
    }

    await Usuario.create({ nome, email, senha, confirmarsenha, cpf });

    res.status(201).send("Usuário registrado com sucesso");
  }

  async show(req, res) {
    let usuario = await Usuario.find();
    return res.json(usuario);
  }
}

export default new RegistrarUsuarioController();
