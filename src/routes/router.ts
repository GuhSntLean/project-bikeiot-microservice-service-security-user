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
routes.post("/refresh-token", refreshToken.refreshToken);

// Necessidade de login
routes.post("/user", userController.createUser);
routes.put('/user', userController.updateUser);
routes.get("/user", userController.getUser); // pegando informações do usuario usuario
routes.get("/list-user", userController.listUser);

routes.put('/update-password', userController.changePassword);

export default routes;
