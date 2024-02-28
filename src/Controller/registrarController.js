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

  async verificalogin(req, res) {
    let id = req.session.Id;
    if (!id) {
      return res.json({ login: false });
    } else {
      return res.json({ login: true, id: id }); 
  }
}

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


  // update usuario 
  async update(req, res) {
    const { id, nome, email, senha, confirmarsenha, cpf } = req.body;
  
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).send("Usuário não encontrado");
    }
  
    if (email && (email !== usuario.email)) {
      const usuarioExiste = await Usuario.findOne({ email });
      if (usuarioExiste) {
        return res.status(409).send("Email já está em uso");
      }
    }
  
    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;
    usuario.senha = senha || usuario.senha;
    usuario.confirmarsenha = confirmarsenha || usuario.confirmarsenha;
    usuario.cpf = cpf || usuario.cpf;
  
    await usuario.save();
  
    return res.status(200).send("Usuário atualizado com sucesso");
  }
}



export default new RegistrarUsuarioController();
