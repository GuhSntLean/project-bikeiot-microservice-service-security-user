import { hash } from 'bcrypt';


class AuthenticateUserUseCase {

  async execute({ login, password }: InterfaceRequest) {
    
    const passwordCrypt = await hash(password, 8);

    
  }
}

export { AuthenticateUserUseCase };
