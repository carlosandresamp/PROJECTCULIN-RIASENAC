const express = require("express");
const routes = require("./routes/routes");
import session from "express-session";
import mongoose from "mongoose";

// @author carlos augusto
// @ date 22/01/2024
// @memberof App
// @description este contem o contrutor com a conecção do banco de dados

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    mongoose.connect(
      "mongodb+srv://carlos:3178931789@cluster0.cpfsxlr.mongodb.net/?retryWrites=true&w=majority"
    );
  }
  middlewares() {
    this.server.use(express.static(__dirname + "/public"));
    this.server.use(express.json());
    this.server.use(
      session({
        secret: "werewrwewrwe",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
      })
    );
  }
  routes() {
    this.server.use(routes);
  }
}
module.exports = new App().server;
