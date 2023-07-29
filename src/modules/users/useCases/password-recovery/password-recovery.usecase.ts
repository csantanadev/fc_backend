import { StatusCodes } from "http-status-codes";
import { IUserRepository } from "../../repositories/user.repository";
import { CustomError } from "../../../../errors/custom.error";
import { User } from "../../entities/user.entity";

type RecoveryRequest = {
  cpf: string;
  mother_name: string;
  email: string;
};

export class PasswordRecoveryUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async recovery(data: RecoveryRequest, id: string) {
    const userExists = await this.userRepository.findByUserId(id);

    if (!userExists) {
      throw new CustomError(
        "User does not exists.",
        StatusCodes.BAD_REQUEST,
        "USER_NOT_EXISTS"
      );
    }

    const password = await this.userRepository.passwordRecovery(
      id,
      data.cpf,
      data.mother_name,
      data.email
    );

    if (password === "") {
      throw new CustomError(
        "Incorrect data.",
        StatusCodes.BAD_REQUEST,
        "INVALID RECOVERY"
      );
    }

    return {
      psw: password,
    };
  }

  async changePassword(newPassword: string, id: string) {
    const userExists = await this.userRepository.findByUserId(id);

    if (!userExists) {
      throw new CustomError(
        "User does not exists.",
        StatusCodes.BAD_REQUEST,
        "USER_NOT_EXISTS"
      );
    }

    // change new password
    userExists.password = newPassword;

    // cria uma nova instancia para ajustar a crypto e updateAt
    const changeUser = await User.create(userExists);

    // update on DB
    await this.userRepository.update(changeUser, id);
  }
}
