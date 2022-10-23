import { hash } from "bcrypt";
import { UserProvider } from "../provider/UserProvider";
import { userRepository } from "../repository/UserRepository";
import { InterfaceUser } from "../interfaces/InterfaceUser";
import { User } from "../models/User";
class UserUseCase {
  async createUser({ userName, email, password }: InterfaceUser) {
    // Verificando se o usuario existe com E-MAIL e USUARIO

    const providerValidation = new UserProvider();
    const existUserName = await userRepository.findOneBy({
      userName: userName,
    });
    const existEmail = await userRepository.findOneBy({ email: email });

    if (existUserName) {
      return new Error("User already exists or irreguar");
    }

    if (existEmail || !providerValidation.emailValidation(email)) {
      return new Error("Email already exists or irregular");
    }

    console.log(providerValidation.passwordValidation(password));
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

  async updateUser(id: string, { userName, email }: InterfaceUser) {
    // TODO: fazer validação de com outros usuarios
    
    const user = await userRepository.findOneBy({ id: id });

    if (user) {
      try {
        await userRepository
          .createQueryBuilder()
          .update(User)
          .set({
            userName: userName || user.userName,
            email: email || user.email,
          })
          .where("id = id:", { id: id })
          .execute();
        return true;
      } catch (error) {
        console.log(`Error message: ${error}`);
        return false;
      }
    }
  }

  async getUser(id: string) {
    const user = await userRepository.findOneBy({ id: id });

    if (!user) {
      return "false";
    }
    return user;
  }

  async getListUser() {
    const users = await userRepository.find();

    return users;
  }
}

export { UserUseCase };
