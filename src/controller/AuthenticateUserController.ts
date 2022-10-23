import { Request, Response } from "express";

class AuthenticateUserController {
  async newToken(request: Request, response: Response) {
    return response.json();
  }
}

export { AuthenticateUserController };
