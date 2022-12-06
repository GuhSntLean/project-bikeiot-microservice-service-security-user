import { Router } from "express";

import { AuthenticateUserController } from "../controller/AuthenticateUserController";
import { RefreshTokenController } from "../controller/RefreshTokenController";
import { UserController } from "../controller/UserController";
import AuthenticatedUserMiddleware from "../middleware/AuthenticatedUserMiddleware";
import AuthenticatedAdminMiddleware from "../middleware/AuthenticatedAdminMiddleware";

const authenticatedUserMiddleware = new AuthenticatedUserMiddleware();
const authenticatedAdminMiddleware = new AuthenticatedAdminMiddleware();

const userController = new UserController();
const authenticate = new AuthenticateUserController();
const refreshToken = new RefreshTokenController();

const routes = Router();

// Sem necessidade de login (Rotas sem segurança, pois são rotas de entrada)
routes.post("/login", authenticate.authentication);
routes.post("/refresh-token", refreshToken.refreshToken);
routes.post("/user", userController.createUser);

// Necessidade de login (Rotas com segurança, pois necessita de credencial e Token para continar)
// Rotas para o usuario comum 
routes.put(
  "/user",
  authenticatedUserMiddleware.ensureAuthenticated,
  userController.updateUser
);
routes.post(
  "/get-user",
  authenticatedUserMiddleware.ensureAuthenticated,
  userController.getUser
);

routes.put(
  "/update-password",
  authenticatedUserMiddleware.ensureAuthenticated,
  userController.changePassword
);

// Rotas para o usuario administrador
routes.post(
  "/get-user-id",
  authenticatedAdminMiddleware.ensureAuthenticated,
  userController.getUser
);
routes.post(
  "/list-user",
  authenticatedAdminMiddleware.ensureAuthenticated,
  userController.listUser
);

export default routes;
