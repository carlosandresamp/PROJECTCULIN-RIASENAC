import Receita from "../Model/receita";
import User from "../Model/User";

class CadastroReceita {
  async store(req, res) {
    try {
      const foto = req.file ? req.file.filename : null;
      const { Titulo, ingredientes, modoDePreparo, tempo, categoria, video } = req.body;
      const categoriasArray = categoria.split(", ");
      const userId = req.headers.userid;
      console.log(userId);
      if (!userId) {
        return res.status(400).json({ message: "ID do usuário não fornecido." });
      }

      const userExists = await User.findById(userId);


      if (!Titulo || !ingredientes || !modoDePreparo || !tempo ) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios." });
      }

      const receitaCadastrada = await Receita.create({
        Titulo,
        ingredientes,
        modoDePreparo,
        tempo,
        categoria: categoriasArray,
        user: userExists._id,
        foto,
        chef: userExists.nome, 
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
      const receitas = await Receita.find().populate('user');
      return res.json(receitas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao listar as receitas." });
    }
  }
  


async show(req, res) {
  try {
    const receita = await Receita.findById(req.params.id);
    if (!receita) {
      return res.status(404).json({ message: "Receita não encontrada." });
    }
    return res.json(receita);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar a receita." });
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
        { _id: id }, 
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
      const { id } = req.headers; 

      // Procurar a receita pelo ID e deletá-la
      const receita = await Receita.findByIdAndDelete(id);

      if (!receita) {
        return res.status(404).json({ message: "Receita não encontrada." });
      }

      return res.status(200).json({ message: "Receita deletada com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao deletar a receita." });
    }
  }
}



export default new CadastroReceita();
