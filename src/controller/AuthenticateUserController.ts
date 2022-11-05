import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "../usecase/AuthenticateUserUseCase";
import { InterfaceRequest } from "../interfaces/InterfaceRequest";

class AuthenticateUserController {
  async authentication(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const intefaceLogin: InterfaceRequest = {
      login: username,
      password,
    };

    const token = await authenticateUserUseCase.authenticate(intefaceLogin);

    return response.json(token); 
  }
}

export { AuthenticateUserController };
