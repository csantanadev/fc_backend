import { User } from "../entities/user.entity";

export interface IUserRepository {
  findByUserId(id: string): Promise<User | undefined>;
  findByUserName(username: string): Promise<User | undefined>;
  save(payload: User): Promise<User>;
  update(payload: User, id: string): Promise<void>;
  delete(ids: string[]): Promise<void>;
  passwordRecovery(
    id: string,
    cpf: string,
    motherName: string,
    email: string
  ): Promise<string>;
}
