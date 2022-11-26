import { Request, Response } from "express";
import { UserUseCase } from "../usecase/UserUseCase";

class UserController {
  async createUser(request: Request, response: Response) {
    try {
      const { username, email, password } = request.body;

      const userUseCase = new UserUseCase();
      const result = await userUseCase.createUser({
        username: username,
        email,
        password,
      });

      if (result instanceof Error) {
        return response.status(400).json(result.message);
      }

      return response.status(201).json(result);
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
  }

  async updateUser(request: Request, response: Response) {
    try {
      const { id, username, email } = request.body;

      if (!id || !email || !username) {
        return response.status(500).json("Field is missing");
      }

      const userUseCase = new UserUseCase();
      const result = await userUseCase.updateUser(id, { username, email });

      if (result instanceof Error) {
        return response.status(400).json(result.message);
      }

      return response.status(201).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }

  async changePassword(request: Request, response: Response) {
    try {
      const { id, oldpassword, newpassword } = request.body;

      if (!oldpassword || !newpassword) {
        return response.status(500).json("Field is missing");
      }

      const userUseCase = new UserUseCase();
      const result = await userUseCase.updatePassword(id, oldpassword, newpassword);

      if (result instanceof Error) {
        return response.status(400).json(result.message);
      }

      return null;
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}

export { UserController };
