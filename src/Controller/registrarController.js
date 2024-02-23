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
  // // Cria uma rota que retorna o id do usuário logado
  // async verificalogin(req, res) {
  //   // Obtém o id do usuário da sessão
  //   let id = req.session.Id;
  //   // Retorna o id como um JSON
  //   res.json({ id: id });
  // }

  async show(req, res) {
    let usuario = await Usuario.find();
    return res.json(usuario);
  }

  async login(req, res) {
    const { email, senha } = req.body;

    const user = await Usuario.findOne({ email: email }).select("+senha");

    if (!user) {
      return res.status(401).json({ error: "Email ou Senha incorreto(s)" });
    }

    if (user.senha !== senha) {
      return res.status(401).json({ error: "Senha incorreta" });
    } else {
      req.session.Id = user._id;
      return res.json(user);
    }
    
  }
}

export default new RegistrarUsuarioController();
