import {  UpdateUserUseCase } from "./update-user.usecase";
import { UserPrismaRepository } from "../../repositories/implementations/user.prisma.repository";
import {  UpdateUserController } from "./update-user.controller";

const userPrismaRepository = new UserPrismaRepository();
const updateUserUseCase = new UpdateUserUseCase(userPrismaRepository);
const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserController };
