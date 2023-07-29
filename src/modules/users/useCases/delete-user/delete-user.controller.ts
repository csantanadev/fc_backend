import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DeleteUserUseCase } from "./delete-user.usecase";
import { validatorSchema } from "../../../../infra/shared/validator/zod";
import { ValidationSchemaError } from "../../../../errors/validation-schema.error";
import { deleteUserSchema } from "./delete-user.schema";

export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  handle = async (request: Request, response: Response) => {
    try {
      const { body } = request;

      // validação de schema
      validatorSchema(deleteUserSchema, body);

      await this.deleteUserUseCase.execute(body);

      return response.status(StatusCodes.NO_CONTENT).end();
    } catch (error: any) {
      if (error instanceof ValidationSchemaError) {
        return response.status(error.statusCode).json(error.errors);
      }
      return response.status(error.statusCode).json({ message: error.message });
    }
  };
}
