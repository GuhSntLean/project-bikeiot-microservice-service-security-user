import { compare } from "bcrypt";
import { RefreshTokenProvider } from "../provider/RefreshTokenProvider";
import { TokenProvider } from "../provider/TokenProvider";
import { UserProvider } from "../provider/UserProvider";
import { userRepository } from "../repository/UserRepository";
import { InterfaceRequest } from "../interfaces/InterfaceRequest";

class AuthenticateUserUseCase {
  async authenticate({ login, password }: InterfaceRequest) {
    let user = null;

    // Verficando se o usuario é existente
    const providerValidation = new UserProvider();
    if (providerValidation.emailValidation(login)) {
      user = await userRepository.findOneBy({
        email: login,
      });
    } else {
      user = await userRepository.findOneBy({
        userName: login,
      });
    }

    if (!user) {
      return new Error("Login or password invalid");
    }

    // Verificando se o password é igual
    const passwordPass = await compare(password, user.password);
    if (!passwordPass) {
      return new Error("Login or password invalid");
    }

    //  Gerando um tokem para o usuario
    const tokenProvider = new TokenProvider();
    const token = tokenProvider.execute(user.id);

    // Gerando um refreshtoken
    const refreshTokenProvider = new RefreshTokenProvider();
    const refreshToken = refreshTokenProvider.execute(user.id);

    return { token, refreshToken };
  }
}

export { AuthenticateUserUseCase };
