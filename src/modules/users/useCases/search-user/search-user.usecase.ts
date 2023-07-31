import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../../../errors/custom.error";
import {
  IUserRepository,
  SearchParams,
} from "../../repositories/user.repository";

export class SearchUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async searchUser(params: SearchParams) {
    const users = await this.userRepository.findUserByParams(params);

    return users;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findByUserId(id);

    if (!user) {
      throw new CustomError("User not found.", StatusCodes.NOT_FOUND);
    }

    const { password, ...restUserResponse } = user;

    return restUserResponse;
  }
}
