import { Request, Response } from "express";
import { UserUseCase } from "../usecase/UserUseCase";

class UserController {
  async createUser(request: Request, response: Response) {
    // const { user_name, email, password } = request.body;
    const userUseCase = new UserUseCase();

    return response.status(201).json({});
  }
}

export { UserController };
