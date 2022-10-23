import { Router } from "express";

import { UserController } from "../controller/UserController";

const userController = new UserController();

const routes = Router();

routes.get("/user"); // pegando informações do usuario usuario
routes.post("/user"); // modificando usuario (username, email)
routes.put("/user"); // modificando usuario (username, email)

routes.post("/register", userController.createUser); // criando usuario

routes.post("/change-password"); // modificando password do usuario
routes.post("/forgot-password"); // caso tenha esquecido a senha

routes.post("/login"); // login do usuario
routes.post("/refreshtoken"); // refresh token 


export default routes;
