import { SearchUserUseCase } from "./search-user.usecase";
import { UserPrismaRepository } from "../../repositories/implementations/user.prisma.repository";
import { SearchUserController } from "./search-user.controller";

const userPrismaRepository = new UserPrismaRepository();
const searchUserUseCase = new SearchUserUseCase(userPrismaRepository);
const searchUserController = new SearchUserController(searchUserUseCase);

export { searchUserController };
