import { Router } from "express";

import { UserController } from "../controller/UserController";

const userController = new UserController();

const routes = Router();

routes.post("/create-user", userController.createUser);

export default routes;

