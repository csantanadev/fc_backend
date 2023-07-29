import {  PasswordRecoveryUseCase } from "./password-recovery.usecase";
import { UserPrismaRepository } from "../../repositories/implementations/user.prisma.repository";
import {  PasswordRecoveryController } from "./password-recovery.controller";

const userPrismaRepository = new UserPrismaRepository();
const passwordRecoveryUseCase = new PasswordRecoveryUseCase(userPrismaRepository);
const passwordRecoveryController = new PasswordRecoveryController(passwordRecoveryUseCase);

export { passwordRecoveryController };
