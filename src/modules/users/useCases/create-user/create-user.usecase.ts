import { StatusCodes } from "http-status-codes";
import { IUserRepository } from "./../../repositories/user.repository";
import { User } from "../../entities/user.entity";
import { CustomError } from "../../../../errors/custom.error";

type UserRequest = {
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  cpf: string;
  date_birth: string;
  mother_name: string;
};

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: UserRequest) {
    const user = await User.create({
      ...data,
      date_birth: new Date(data.date_birth),
    });

    const userExists = await this.userRepository.findByUserName(data.username);

    if (userExists) {
      throw new CustomError(
        "Username already exists.",
        StatusCodes.BAD_REQUEST,
        "USER_EXISTS"
      );
    }

    const userCreated = await this.userRepository.save(user);

    return {
      id: userCreated.id,
      name: userCreated.name,
      username: userCreated.username,
      email: userCreated.email,
      phone: userCreated.phone,
      cpf: userCreated.cpf,
      date_birth: userCreated.date_birth,
      mother_name: userCreated.mother_name,
      status: userCreated.status,
    };
  }
}
