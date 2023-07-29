import { DeleteUserUseCase } from "./delete-user.usecase";
import { UserPrismaRepository } from "../../repositories/implementations/user.prisma.repository";
import { DeleteUserController } from "./delete-user.controller";

const userPrismaRepository = new UserPrismaRepository();
const deleteUserUseCase = new DeleteUserUseCase(userPrismaRepository);
const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserController };
