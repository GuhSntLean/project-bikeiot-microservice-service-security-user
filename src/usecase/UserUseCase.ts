import { compare, hash } from "bcrypt";
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

      const returnUser: InterfaceUserReturnResult = {
        id: newUser.id,
        username: newUser.userName,
        email: newUser.email,
      };

      await serverAmqp.start();
      await serverAmqp.publishExchange("common.user", JSON.stringify(returnUser));

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

    const validateUsername = await userRepository.findOneBy({
      userName: username,
    });
    const validateEmail = await userRepository.findOneBy({ email: email });

    if (validateUsername && validateUsername.id != id) {
      return new Error("Username is being used or is invalid");
    }
    if (validateEmail && validateEmail.id != id) {
      return new Error("Email is being used or is invalid");
    }

    try {
      const result = await userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          userName: username || user.userName,
          email: email || user.email,
        })
        .where("id = :id", { id: id })
        .execute();

      if (result.affected != 1) {
        return new Error("Error when updating");
      }

      const resultUpdate = await userRepository.findOneBy({ id: id });

      const returnUser: InterfaceUserReturnResult = {
        id: resultUpdate.id,
        username: resultUpdate.userName,
        email: resultUpdate.email,
      };

      await serverAmqp.start();
      await serverAmqp.publishExchange("common.user", JSON.stringify(returnUser));

      return returnUser;
    } catch (error) {
      return new Error("Error save User");
    }
  }

  async updatePassword(id: string, oldpassword: string, newpassword: string) {
    const providerValidation = new UserProvider();

    const user = await userRepository.findOneBy({ id: id });

    if (!user) {
      return new Error("User not found");
    }

    const passwordPass = await compare(oldpassword, user.password);

    if (!passwordPass) {
      return new Error("Password is invalid");
    }

    if (
      oldpassword == newpassword ||
      !providerValidation.passwordValidation(newpassword)
    ) {
      return new Error("Password is invalid");
    }

    try {
      const newPassoworsdCrypt = await hash(newpassword, 8);

      const result = await userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          password: newPassoworsdCrypt || user.password,
        })
        .where("id = :id", { id: id })
        .execute();

      if (result.affected != 1) {
        return new Error("Error when updating");
      }

      const update = await userRepository.findOneBy({ id: id });

      const resultUpdate = {
        id: update.id,
        update: true,
      };

      return resultUpdate;
    } catch (error) {
      return new Error("Update error");
    }
  }

  async getUser(iduser: string) {
    try {
      const user = await userRepository.findOneBy({ id: iduser });

      if(!user){
        return new Error("User not found");
      }

      const returnUser: InterfaceUserReturnResult = {
        id: user.id,
        username: user.userName,
        email: user.email,
      };

      return returnUser

    } catch (error) {
      return new Error("Find error");
    }
  }
}

export { UserUseCase };
