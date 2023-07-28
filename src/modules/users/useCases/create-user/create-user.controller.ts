import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../../../utils/logger";
import { CreateUserUseCase } from "./create-user.usecase";

import { validatorSchema } from "../../../../infra/shared/validator/zod";
import { createUserSchema } from "./create-user.schema";
import { ValidationSchemaError } from "../../../../errors/validation-schema.error";

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  handle = async (request: Request, response: Response) => {
    logger.info("Usuário sendo criado");

    try {
      const { body } = request;

      // validação de schema
      validatorSchema(createUserSchema, body);

      const user = await this.createUserUseCase.execute(body);

      return response.status(StatusCodes.CREATED).json(user);
    } catch (error: any) {
      if (error instanceof ValidationSchemaError) {
        return response.status(error.statusCode).json(error.errors);
      }
      return response.status(error.statusCode).json({ message: error.message });
    }
  };
}
