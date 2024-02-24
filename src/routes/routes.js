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
routes.get("/verificalogin", RegistrarUsuarioController.verificalogin);
routes.post("/cadastroReceita", upload.single("foto"), cadastroReceita.store);
routes.put("/update", cadastroReceita.update);
routes.post("/RegistrarUsuarioController", RegistrarUsuarioController.store);
routes.get("/RegistrarUsuarioController", RegistrarUsuarioController.show);
routes.get("/cadastroReceita", cadastroReceita.showAll);
routes.put("/delete", cadastroReceita.delete);
routes.post("/LoginUsuarioController", RegistrarUsuarioController.login);

module.exports = routes;
