import { CreateUserUseCase } from "../usecase/CreateUserUseCase";

class CreateUserController {
  async create() {
    const createUserUseCase = new CreateUserUseCase();
    createUserUseCase.createUser
  }
}

export { CreateUserController };
