import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({ email });

    if (!user)
      throw new Error("email/password incorrect");

    if (!await compare(password, user.password))
      throw new Error("email/password incorrect");


    return sign({ email: user.email }, 'chavedeteste', {
      subject: user.id,
      expiresIn: '1d'
    });
  }

}

export { AuthenticateUserService };