import Usuario from "../Model/User";
import Receita from "../Model/receita"
class RegistrarUsuarioController {
  async store(req, res) {
    const { nome, email, senha, confirmarsenha, cpf } = req.body;

    const usuarioExiste = await Usuario.findOne({ email });
    console.log(usuarioExiste);
    if (usuarioExiste) {
      return res.status(409).send("Usuário já existe");
    }

    const foto = 'chefpadrao.png';
    await Usuario.create({ nome, email, senha, confirmarsenha, cpf, foto });

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

  async getMyProfile(req, res) {
    let id = req.session.Id;
    if (!id) {
      return res.json({ login: false });
    } else {
      let usuario = await Usuario.findById(id);
      return res.json({ login: true, usuario });
    }
  }

  async updateMyProfile(req, res) {
    let id = req.session.Id;
    if (!id) {
      return res.json({ login: false });
    } else {
      let updateObject = req.body;
      if (req.file) {
        updateObject.foto = req.file.filename;
      }
      let usuario = await Usuario.findByIdAndUpdate(id, updateObject, { new: true });
      return res.json({ login: true, usuario });
    }
  }


  async show(req, res) {
    let usuario = await Usuario.find();
    return res.json(usuario);
  }

  async getUserById(req, res) {
    try {
      const usuario = await Usuario.findById(req.params.id);
      const receitas = await Receita.find({ user: usuario._id });
      return res.json({ usuario, receitas });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar o usuário e suas receitas." });
    }
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
