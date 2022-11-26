import { hash } from "bcrypt";
import { UserProvider } from "../provider/UserProvider";
import { userRepository } from "../repository/UserRepository";
import {
  InterfaceUser,
  InterfaceUserUpdate,
  InterfaceUserReturnResult,
} from "../interfaces/InterfaceUser";
import { User } from "../models/User";
import { RabbitmqServer } from "../server/RabbitmqServer";
class UserUseCase {
  async createUser({ username, email, password }: InterfaceUser) {
    // Verificando se o usuario existe com E-MAIL e USUARIO
    const serverAmqp = new RabbitmqServer();

    const providerValidation = new UserProvider();
    const existUserName = await userRepository.findOneBy({
      userName: username,
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
        userName: username,
        email,
        password: passwordHash,
      });

      await userRepository.save(newUser);

      await serverAmqp.start();
      await serverAmqp.publishExchange("common.user", JSON.stringify(newUser));

      const returnUser: InterfaceUserReturnResult = {
        id: newUser.id,
        username: newUser.userName,
        email: newUser.email,
      };

      return returnUser;
    } catch (error) {
      return new Error("Error save User");
    }
  }

  async updateUser(id: string, { username, email }: InterfaceUserUpdate) {
    // TODO: validando com outro usuarios
    const serverAmqp = new RabbitmqServer();

    const user = await userRepository.findOneBy({ id: id });

    if (!user) {
      return new Error("User not found");
    }

    try {
      userRepository.update;
      const result = await userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          userName: username || user.userName,
          email: email || user.email,
        })
        .where("id = :id", { id: id })
        .execute();

      return result;
    } catch (error) {
      return new Error("Error save User");
    }
  }
}

export { UserUseCase };
