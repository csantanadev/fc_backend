import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UpdateUserUseCase } from "./update-user.usecase";

import { validatorSchema } from "../../../../infra/shared/validator/zod";

import { ValidationSchemaError } from "../../../../errors/validation-schema.error";
import { createUserSchema } from "../create-user/create-user.schema";

export class UpdateUserController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  handle = async (request: Request, response: Response) => {
    try {
      const { body, params } = request;

      // validação de schema
      validatorSchema(createUserSchema, body);

      await this.updateUserUseCase.execute(body, params.id);

      return response.status(StatusCodes.NO_CONTENT).end();
    } catch (error: any) {
      if (error instanceof ValidationSchemaError) {
        return response.status(error.statusCode).json(error.errors);
      }
      return response.status(error.statusCode).json({ message: error.message });
    }
  };
}
