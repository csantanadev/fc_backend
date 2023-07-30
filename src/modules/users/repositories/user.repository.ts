import { User } from "../entities/user.entity";

export enum AgeRange {
  UnderNineteen,
  Nineteen_TwentyFive,
  TwentySix_Thirty,
  ThirtyOne_ThirtyFive,
  ThirtySix_Forty,
  OverForty,
}

export type SearchParams = {
  name?: string;
  cpf?: string;
  username?: string;
  status?: string;
  date_birth_start?: string;
  date_birth_end?: string;
  create_at_start?: string;
  create_at_end?: string;
  update_at_start?: string;
  update_at_end?: string;
  age_range?: AgeRange;
};

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
  findUserByParams(params: SearchParams): Promise<User[] | null>;
}
