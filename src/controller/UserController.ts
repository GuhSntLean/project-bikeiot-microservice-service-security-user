import { Request, Response } from "express";
import { UserUseCase } from "../usecase/UserUseCase";

class UserController {
  async createUser(request: Request, response: Response) {
    try {
      const { username, email, password } = request.body;
      
      if (!username || !email || !password) {
        return response.status(400).json({ error: "Field is missing" });
      }

      const userUseCase = new UserUseCase();
      const result = await userUseCase.createUser({
        username: username,
        email,
        password,
      });

      if (result instanceof Error) {
        return response.status(400).json({error: result.message});
      }

      return response.status(201).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json({error: error});
    }
  }

  async updateUser(request: Request, response: Response) {
    try {
      const { id, username, email } = request.body;

      if (!id || !email || !username) {
        return response.status(400).json({ error: "Field is missing" });
      }

      const userUseCase = new UserUseCase();
      const result = await userUseCase.updateUser(id, { username, email });

      if (result instanceof Error) {
        return response.status(400).json({error: result.message});
      }

      return response.status(201).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json({error: error.message});
    }
  }

  async changePassword(request: Request, response: Response) {
    try {
      const { id, oldpassword, newpassword } = request.body;

      if (!id || !oldpassword || !newpassword) {
        return response.status(400).json({ error: "Field is missing" });
      }

      const userUseCase = new UserUseCase();
      const result = await userUseCase.updatePassword(
        id,
        oldpassword,
        newpassword
      );

      if (result instanceof Error) {
        return response.status(400).json({error: result.message});
      }

      return response.status(201).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json({error: error.message});
    }
  }

  async getUser(request: Request, response: Response) {
    try {
      const { id } = request.body;
      console.log(id);

      if (!id) {
        return response.status(400).json({ error: "Field is missing" });
      }

      const userUseCase = new UserUseCase();
      const result = await userUseCase.getUser(id);

      if (result instanceof Error) {
        return response.status(400).json({error: result.message});
      }

      return response.status(201).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json({error: error.message});
    }
  }

  async listUser(request: Request, response: Response) {
    try {
     
      const userUseCase = new UserUseCase();
      const result = await userUseCase.getListUser();

      if (result instanceof Error) {
        return response.status(400).json({error: result.message});
      }

      return response.status(201).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json({error: error.message});
    }
  }
}

export { UserController };
