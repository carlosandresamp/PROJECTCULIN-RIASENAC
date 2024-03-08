import user from "../Model/User";

class UserCadastro {
  async store(req, res) {
    const { Titulo } = req.body;
    let User = await user.findOne({ username, email, password });
    if (!User) {
      User = await user.create({ username, email, password });
    }
    res.json(User);
  }
}

export default new UserCadastro();
