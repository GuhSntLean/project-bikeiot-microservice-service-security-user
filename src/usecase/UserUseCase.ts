import { hash } from "bcrypt";
import { userRepository } from "../repository/UserRepository";

class UserUseCase {
  async createUser({ userName, email, password }: InterfaceUser) {
    // procurando se o cliente existe caso exista volta uma exexption
    const userAlreadyExist = await userRepository.find({
      where: [{ userName }, { email }],
    });

    console.log(userAlreadyExist);
    
    if (userAlreadyExist) {
      throw new Error("Verify informations");
    }
    try {
      const passwordBcrypt = await hash(password, 8);

      const user = await userRepository.create({
        userName,
        email,
        password: passwordBcrypt,
      });

      console.info(`create user ${user}`);
    } catch (error) {
      throw new Error("error with database");
    }
  }
}

export { UserUseCase };
