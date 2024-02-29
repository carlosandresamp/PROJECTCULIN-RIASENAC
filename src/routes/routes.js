import { Router } from "express";
import cadastroReceita from "../Controller/receitaController";
import RegistrarUsuarioController from "../Controller/registrarController";
import multer from "multer";
import uploadconfg from "./uploadConfig";

const upload = multer(uploadconfg);

const routes = new Router();
routes.get("/", (req, res) => {
  return res.json({ message: "ok" });
});

//put/post/delete
routes.get('/logout', function (req, res) {
  req.session.destroy();
  res.json({ success: true, message: "Logout realizado com sucesso" });
});
routes.get("/verificalogin", RegistrarUsuarioController.verificalogin);
routes.post("/cadastroReceita", upload.single("foto"), cadastroReceita.store);
routes.put("/update", cadastroReceita.update);
routes.put("/updateUsuario", RegistrarUsuarioController.update);
routes.post("/RegistrarUsuarioController", RegistrarUsuarioController.store);
routes.get("/RegistrarUsuarioController", RegistrarUsuarioController.show);
routes.get("/cadastroReceita", cadastroReceita.showAll);
routes.get("/cadastroReceita/:id", cadastroReceita.show);

routes.put("/delete", cadastroReceita.delete);
routes.post("/LoginUsuarioController", RegistrarUsuarioController.login);
routes.delete("/cadastroReceita", cadastroReceita.delete);




routes.get('/perfil/:id', function(req, res) {

  const id = req.params.id;
  
  
  const user = db.query('SELECT * FROM users WHERE id = ?', [id]);
 
  if (user) {
    res.json(user);
  } else {
   
    res.status(404).send('Usuário não encontrado');
  }
});

routes.get('/verificalogin', function(req, res) {
 
  
  const id = req.cookies.id;
 
  if (login) {
    res.json({login: true, id: id});
  } else {
   
    res.json({login: false});
  }
});


module.exports = routes;
