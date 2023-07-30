import {
  IUserRepository,
  SearchParams,
} from "../../repositories/user.repository";

export class SearchUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async excute(params: SearchParams) {
    const users = await this.userRepository.findUserByParams(params);

    return users;
  }
}
