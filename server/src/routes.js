import { Router } from "express";
import cadastroReceita from "./Controller/receitaController";
import RegistrarUsuarioController from "./Controller/registrarController";
import multer from "multer";
import uploadconfg from "./config/uploadconfg";

const upload = multer(uploadconfg);

const routes = new Router();
routes.get("/", (req, res) => {
  return res.json({ message: "ok" });
});

//put
routes.post("/cadastroReceita", upload.single("foto"), cadastroReceita.store);
routes.post("/RegistrarUsuarioController", RegistrarUsuarioController.store);
routes.get("/RegistrarUsuarioController", RegistrarUsuarioController.show);
routes.get("/cadastroReceita", cadastroReceita.showAll);
module.exports = routes;
