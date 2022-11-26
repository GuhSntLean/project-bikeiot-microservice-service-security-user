import { Router } from "express";

import { AuthenticateUserController } from "../controller/AuthenticateUserController";
import { RefreshTokenController } from "../controller/RefreshTokenController";
import { UserController } from "../controller/UserController";

const userController = new UserController();
const authenticate = new AuthenticateUserController();
const refreshToken = new RefreshTokenController();

const routes = Router();

// Sem necessidade de login
routes.post("/login", authenticate.authentication);
routes.post("/register", userController.createUser); // criando usuario
routes.post("/refresh-token", refreshToken.refreshToken);



// Necessidade de login
routes.get("/user", userController.getUser); // pegando informações do usuario usuario

routes.put('/update-user', userController.updateUser);
routes.put('/update-password', userController.changePassword);

export default routes;
