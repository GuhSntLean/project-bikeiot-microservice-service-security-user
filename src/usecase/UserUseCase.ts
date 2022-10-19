import { hash } from "bcrypt";
import { UserProvider } from "../provider/UserProvider";
import { userRepository } from "../repository/UserRepository";
import { InterfaceUser } from "../interfaces/InterfaceUser";
class UserUseCase {

  async createUser({ userName, email, password }: InterfaceUser) {
    // Verificando se o usuario existe com E-MAIL e USUARIO

    const providerValidation = new UserProvider();
    const existUserName = await userRepository.findOneBy({ userName: userName });
    const existEmail = await userRepository.findOneBy({ email: email });

    if (existUserName) {
      return new Error("User already exists or irreguar");
    }

    if (existEmail || !providerValidation.emailValidation(email)) {
      return new Error("Email already exists or irregular");
    }

    console.log(providerValidation.passwordValidation(password))
    if (!providerValidation.passwordValidation(password)) {
      return new Error("Password invalid format");
    }

    try {
      const passwordHash = await hash(password, 8);

      const newUser = userRepository.create({
        userName,
        email,
        password: passwordHash,
      });

      await userRepository.save(newUser);

      return newUser;
    } catch (error) {
      console.log(`Error message: ${error}`);
    }
  }

  async updateUser () {}
}

export { UserUseCase };
