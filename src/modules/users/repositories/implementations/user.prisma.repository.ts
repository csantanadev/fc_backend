import { prismaClient } from "../../../../infra/databases/prisma.config";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "./../user.repository";

export class UserPrismaRepository implements IUserRepository {
  async findByUserName(username: string): Promise<User | undefined> {
    const user = await prismaClient.user.findUnique({
      where: {
        username,
      },
    });
    return user || undefined;
  }

  async findByUserId(id: string): Promise<User | undefined> {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });
    return user || undefined;
  }

  async save(payload: User): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        id: payload.id,
        name: payload.name,
        username: payload.username,
        password: payload.password,
        email: payload.email,
        cpf: payload.cpf,
        phone: payload.phone,
        date_birth: payload.date_birth,
        mother_name: payload.mother_name,
      },
    });
    return user;
  }

  async update(payload: User, id: string): Promise<void> {
    await prismaClient.user.update({
      where: {
        id: id,
      },
      data: {
        name: payload.name,
        username: payload.username,
        password: payload.password,
        email: payload.email,
        cpf: payload.cpf,
        phone: payload.phone,
        date_birth: payload.date_birth,
        mother_name: payload.mother_name,
      },
    });
  }

  async delete(ids: string[]): Promise<void> {
    await prismaClient.user.updateMany({
      data: {
        status: "I",
      },
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async passwordRecovery(
    id: string,
    cpf: string,
    motherName: string,
    email: string
  ): Promise<string> {
    const psw = await prismaClient.user.findFirst({
      where: {
        AND: [
          { id },
          { cpf },
          { mother_name: motherName },
          { email },
          { status: "A" },
        ],
      },
    });

    return psw?.password || "";
  }
}
