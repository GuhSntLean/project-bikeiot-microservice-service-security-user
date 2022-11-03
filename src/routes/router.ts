import { Router } from "express";
import { AuthenticateUserController } from "../controller/AuthenticateUserController";

import { UserController } from "../controller/UserController";

const userController = new UserController();
const authenticate = new AuthenticateUserController();

const routes = Router();

routes.post("/login", authenticate.authentication);

routes.get("/user"); // pegando informações do usuario usuario
routes.post("/user"); // modificando usuario (username, email)
routes.put("/user"); // modificando usuario (username, email)

routes.post("/register", userController.createUser); // criando usuario

routes.post("/change-password"); // modificando password do usuario
routes.post("/forgot-password"); // caso tenha esquecido a senha

routes.post("/login"); // login do usuario
routes.post("/refreshtoken"); // refresh token

export default routes;
