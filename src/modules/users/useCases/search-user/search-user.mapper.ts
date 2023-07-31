import { v_users } from "@prisma/client";
import { UserDto } from "../../repositories/user.repository";

export class SearchUserMapper {
  static PrismaToEntity(data: v_users[]): UserDto[] {
    const result: UserDto[] = [];

    for (const usr of data) {
      result.push({
        id: usr.id,
        name: usr.name,
        username: usr.username,
        cpf: usr.cpf,
        email: usr.email,
        phone: usr.phone,
        status: usr.status,
        date_birth: usr.date_birth,
        mother_name: usr.mother_name,
        create_at: usr.create_at,
        update_at: usr.update_at,
      });
    }

    return result;
  }
}
