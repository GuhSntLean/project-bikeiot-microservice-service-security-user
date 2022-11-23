import { Request, Response } from "express";
import { RefreshTokenUseCase } from "../usecase/RefreshTokenUseCase";

class RefreshTokenController {
  async refreshToken(request: Request, response: Response) {
    const { refresh_token } = request.body;

    if (!refresh_token) {
      return response.status(401).json({ error: "not authorized" });
    }

    const refreshToken = new RefreshTokenUseCase();
    const token = await refreshToken.verifyToken(refresh_token);

    console.log(token);

    return response.status(201).json({ token: token });
  }
}

export { RefreshTokenController };
