import { prismaClient } from "../../../../infra/databases/prisma.config";
import { endOfDay, startOfDay } from "../../../../utils/date";
import { User } from "../../entities/user.entity";
import { SearchUserMapper } from "../../useCases/search-user/search-user.mapper";
import {
  AgeRange,
  IUserRepository,
  SearchParams,
  UsersResponse,
} from "./../user.repository";

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

  async findUserByParams({
    name,
    cpf,
    username,
    status,
    age_range,
    date_birth_start,
    date_birth_end,
    create_at_start,
    create_at_end,
    update_at_start,
    update_at_end,
  }: SearchParams): Promise<UsersResponse | null> {
    const whereClause: any = [];

    if (name) {
      whereClause.push({ name: { contains: name } });
    }
    if (cpf) {
      whereClause.push({ cpf });
    }
    if (username) {
      whereClause.push({ username });
    }
    if (status) {
      whereClause.push({ status });
    }
    if (age_range) {
      switch (age_range) {
        case AgeRange.UnderNineteen:
          whereClause.push({
            age: {
              lte: 18,
            },
          });
          break;
        case AgeRange.Nineteen_TwentyFive:
          whereClause.push({
            age: {
              gte: 19,
              lte: 25,
            },
          });
          break;
        case AgeRange.TwentySix_Thirty:
          whereClause.push({
            age: {
              gte: 26,
              lte: 30,
            },
          });
          break;
        case AgeRange.ThirtyOne_ThirtyFive:
          whereClause.push({
            age: {
              gte: 31,
              lte: 35,
            },
          });
          break;
        case AgeRange.ThirtySix_Forty:
          whereClause.push({
            age: {
              gte: 36,
              lte: 40,
            },
          });
          break;
        case AgeRange.OverForty:
          whereClause.push({
            age: {
              gte: 40,
            },
          });
          break;
      }
    }
    if (date_birth_start && date_birth_end) {
      whereClause.push({
        date_birth: {
          gte: startOfDay(date_birth_start),
          lte: endOfDay(date_birth_end),
        },
      });
    }
    if (create_at_start && create_at_end) {
      whereClause.push({
        create_at: {
          gte: startOfDay(create_at_start),
          lte: endOfDay(create_at_end),
        },
      });
    }
    if (update_at_start && update_at_end) {
      whereClause.push({
        update_at: {
          gte: startOfDay(update_at_start),
          lte: endOfDay(update_at_end),
        },
      });
    }

    console.log(whereClause);

    const users = await prismaClient.v_users.findMany({
      where: {
        AND: whereClause,
      },
    });

    return {
      records: SearchUserMapper.PrismaToEntity(users),
      all_records: users[0]?.count,
    };
  }
}
