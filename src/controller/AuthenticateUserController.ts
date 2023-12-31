import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "../usecase/AuthenticateUserUseCase";
import { InterfaceRequest } from "../interfaces/InterfaceRequest";
import { TokenProvider } from "../provider/TokenProvider";
import { RefreshTokenProvider } from "../provider/RefreshTokenProvider";

class AuthenticateUserController {
  async authentication(request: Request, response: Response) {
    const { username, password } = request.body;

    if (!username && !password) {
      return response
        .status(401)
        .json({ error: "Login or Passoword incorrect" });
    }

    const intefaceLogin: InterfaceRequest = {
      login: username,
      password,
    };

    try {
      const authenticateUserUseCase = new AuthenticateUserUseCase();
      const userId: any = await authenticateUserUseCase.authenticate(
        intefaceLogin
      );

      if (!(typeof userId === "string")) {
        return response.status(401).json({ error: userId.message });
      }

      //  Gerando um tokem para o usuario
      const tokenProvider = new TokenProvider();
      const token = tokenProvider.execute(userId);

      // Gerando um refreshtoken
      const refreshTokenProvider = new RefreshTokenProvider();
      const refreshToken = await refreshTokenProvider.execute(userId);

      return response.json({ token, refreshToken });
    } catch (error) {
      return new Error("Error generate refreshtoken or token");
    }
  }
}

export { AuthenticateUserController };
