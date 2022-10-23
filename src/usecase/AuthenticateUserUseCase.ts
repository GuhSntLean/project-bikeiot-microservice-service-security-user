import { compare } from "bcrypt";
import { UserProvider } from "../provider/UserProvider";
import { userRepository } from "../repository/UserRepository";

class AuthenticateUserUseCase {
  async loginVerify({ login, password }: InterfaceRequest) {
    const providerValidation = new UserProvider();

    let user = null;

    if (providerValidation.emailValidation(login)) {
      user = await userRepository.findOneBy({
        email: login,
      });
    } else {
      user = await userRepository.findOneBy({
        userName: login,
      });
    }

    const passwordPass = await compare(password, user.password);

    if (user == null && !passwordPass) {
      return new Error("Login or password invalid");
    }

    return true;
  }
}

export { AuthenticateUserUseCase };
