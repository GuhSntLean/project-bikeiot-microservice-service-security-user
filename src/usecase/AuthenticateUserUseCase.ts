import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { UserProvider } from "../provider/UserProvider";
import { userRepository } from "../repository/UserRepository";

class AuthenticateUserUseCase {
  async authenticate({ login, password }: InterfaceRequest) {
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

    if (user == null) {
      return new Error("Login or password invalid");
    }

    const passwordPass = await compare(password, user.password);

    if (!passwordPass) {
      return new Error("Login or password invalid");
    }

    const token = sign({}, "79123427-290f-4c63-aca3-120ea5364159", {
      subject: user.id,
      expiresIn: "100s",
    });

    return token;
  }
}

export { AuthenticateUserUseCase };
