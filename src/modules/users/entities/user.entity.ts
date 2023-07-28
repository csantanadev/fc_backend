import { randomUUID } from "crypto";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../../errors/custom.error";
import { PasswordBcrypt } from "../../../infra/shared/crypto/password.bcrypt.impl";

type IUser = {
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  cpf: string;
  status?: string | null;
  date_birth: Date;
  mother_name: string;
};

export class User {
  readonly id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  cpf: string;
  status?: string | null;
  date_birth: Date;
  mother_name: string;

  private constructor(props: IUser) {
    this.id = randomUUID();

    this.name = props.name;
    this.username = props.username;
    this.password = props.password;
    this.email = props.email;
    this.phone = props.phone;
    this.cpf = props.cpf;
    this.status = props.status;
    this.date_birth = props.date_birth;
    this.mother_name = props.mother_name;
  }

  static async create(props: IUser) {
    if (!props.username || !props.password) {
      throw new CustomError(
        "Username / Password is required.",
        StatusCodes.UNPROCESSABLE_ENTITY,
        "PARAMETER_REQUIRED"
      );
    }

    const bcrypt = new PasswordBcrypt();
    props.password = await bcrypt.hash(props.password);

    const user = new User(props);
    return user;
  }
}
