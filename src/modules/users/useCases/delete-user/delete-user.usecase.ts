import { IUserRepository } from "../../repositories/user.repository";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(ids: string[]) {
    await this.userRepository.delete(ids);
  }
}
