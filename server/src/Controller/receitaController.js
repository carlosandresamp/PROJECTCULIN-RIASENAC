import Receita from "../Model/receitas";
import User from "../Model/User";
class cadastroReceita {
  async store(req, res) {
    try {
      const foto = req.file ? req.file.filename : null;
      const { Titulo, nomeDoChef, ingredientes, modoDePreparo, tempo } =
        req.body;
      const { user_id } = req.headers;
      if (
        !req.body.Titulo ||
        !req.body.nomeDoChef ||
        !req.body.ingredientes ||
        !req.body.modoDePreparo ||
        !req.body.tempo
      ) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios." });
      }

      console.log(Titulo, nomeDoChef, ingredientes, modoDePreparo, tempo);
      console.log(user_id);
      const userExists = await User.findById(user_id);

      console.log(userExists);
      if (!userExists) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const receitaCadastrada = await Receita.create({
        Titulo,
        nomeDoChef,
        ingredientes,
        modoDePreparo,
        tempo,
        user: user_id,
        foto,
      });

      // console.log(receitaCadastrada);
      return res.status(201).json({
        message: "Receita adicionada com sucesso.",
        receita: receitaCadastrada,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao cadastrar a receita." });
    }
  }

  async show(req, res) {
    try {
      const { user_id } = req.headers;
      console.log("headers", user_id);

      if (!user_id) {
        return res.status(404).json({ Message: "Usuário Não identificado!" });
      }

      const userRecieved = await User.findById({ user_id });

      if (userRecieved) {
        console.log("if com user", userRecieved);
        let receitaUsuario = await Receita.findOne({ user: user_id });
        return res.status(200).json(receitaUsuario);
      }
      console.log("else do false", userRecieved);
      return res
        .status(404)
        .json({ Message: "Não existe usuário com este ID" });
    } catch (error) {
      return res.status(500).json({ Message: error.message });
    }
  }

  async index(req, res) {
    const { id } = req.query;
    if (!id) {
      return res.status(404).json({ Message: "Insira um ID Válido" });
    }
    const receitaSolicitada = await Receita.findById(id);

    return res.status(200).json(receitaSolicitada);
  }

  async showAll(req, res) {
    try {
      const receitas = await Receita.find();
      return res.json(receitas);
    } catch (error) {
      return res.status(500).json({ Message: error.message });
    }
  }
}

export default new cadastroReceita();
