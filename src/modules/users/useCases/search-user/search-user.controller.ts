import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SearchUserUseCase } from "./search-user.usecase";
import { ValidationSchemaError } from "../../../../errors/validation-schema.error";

export class SearchUserController {
  constructor(private readonly searchUserUseCase: SearchUserUseCase) {}

  handle = async (request: Request, response: Response) => {
    try {
      //const { body, params } = request;

      // validação de schema
      // validatorSchema(pswRecoverySchema, body);

      const users = await this.searchUserUseCase.excute({
        name: "Maria",
      });

      return response.status(StatusCodes.OK).json(users);
    } catch (error: any) {
      if (error instanceof ValidationSchemaError) {
        return response.status(error.statusCode).json(error.errors);
      }
      return response.status(error.statusCode).json({ message: error.message });
    }
  };
}
