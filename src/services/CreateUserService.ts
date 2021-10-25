import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from 'bcryptjs';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, password, admin = false }: IUserRequest) {
    if (!email) {
      throw new Error('email incorrect')
    }

    const usersRepository = getCustomRepository(UsersRepositories);

    const userExists = await usersRepository.findOne({ email });
    if (userExists) {
      throw new Error('user already exists');
    }

    const hashPassowrd = await hash(password, 8);

    const user = usersRepository.create({ name, email, password: hashPassowrd, admin });
    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };