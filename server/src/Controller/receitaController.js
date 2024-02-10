// Controller
import Receita from "../Model/Receita";
import User from "../Model/User";

class CadastroReceita {
  async store(req, res) {
    try {
      const foto = req.file ? req.file.filename : null;
      const { Titulo, ingredientes, modoDePreparo, tempo } = req.body;
      const { username } = req.headers;

      if (!Titulo || !ingredientes || !modoDePreparo || !tempo) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios." });
      }

      const userExists = await User.findOne({ username });

      if (!userExists) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const receitaCadastrada = await Receita.create({
        Titulo,
        ingredientes,
        modoDePreparo,
        tempo,
        user: userExists._id,
        foto,
      });

      return res.status(201).json({
        message: "Receita adicionada com sucesso.",
        receita: receitaCadastrada,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao cadastrar a receita." });
    }
  }

  async index(req, res) {
    const { id } = req.query;

    if (!id) {
      return res.status(404).json({ message: "Insira um ID Válido" });
    }

    const receitaSolicitada = await Receita.findById(id);

    if (!receitaSolicitada) {
      return res.status(404).json({ message: "Receita não encontrada." });
    }

    return res.status(200).json(receitaSolicitada);
  }

  async showAll(req, res) {
    try {
      const receitas = await Receita.find();
      return res.json(receitas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao listar as receitas." });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.query;
      const { Titulo, ingredientes, modoDePreparo, tempo } = req.body;
      const { username } = req.headers;
      console.log(id);
      // console.log(req.body);
      // console.log(Titulo);
      // console.log(ingredientes);
      // console.log(modoDePreparo);
      // console.log(tempo);
      // console.log(username);
      const userExists = await User.findById(username);
      // console.log(userExists);

      if (!userExists) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      if (!Titulo || !ingredientes || !modoDePreparo || !tempo) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios." });
      }
      const buscaReceita = Receita.findById(id);
      console.log("busca receita:  ", buscaReceita);
      const receitaAtualizada = await Receita.findOneAndUpdate(
        { _id: id }, // filter
        { Titulo, ingredientes, modoDePreparo, tempo }
      );
      console.log(receitaAtualizada);

      if (!receitaAtualizada) {
        return res.status(404).json({ message: "Receita não encontrada." });
      }

      return res.status(200).json({
        message: "Receita atualizada com sucesso.",
        receita: receitaAtualizada,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar a receita." });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params; // ID da receita a ser deletada
      const { username } = req.headers;

      const userExists = await User.findOne({ username });

      if (!userExists) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const receitaDeletada = await Receita.findOneAndDelete({
        _id: id,
        user: userExists._id,
      });

      if (!receitaDeletada) {
        return res.status(404).json({ message: "Receita não encontrada." });
      }

      return res.status(200).json({
        message: "Receita deletada com sucesso.",
        receita: receitaDeletada,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao deletar a receita." });
    }
  }
}

export default new CadastroReceita();
