import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SearchUserUseCase } from "./search-user.usecase";
import { ValidationSchemaError } from "../../../../errors/validation-schema.error";
import { searchUsersSchema } from "./search-user.schema";
import { validatorSchema } from "../../../../infra/shared/validator/zod";
import { AgeRange } from "../../repositories/user.repository";

export class SearchUserController {
  constructor(private readonly searchUserUseCase: SearchUserUseCase) {}

  searchUser = async (request: Request, response: Response) => {
    try {
      const { body } = request;
      const { page } = request.query;
      const p = page ? Number(page) : 1;

      // validação de schema
      validatorSchema(searchUsersSchema, body);

      const {
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
      } = body;

      let range;
      switch (age_range) {
        case 0:
          range = AgeRange.UnderNineteen as const;
          break;
        case 1:
          range = AgeRange.Nineteen_TwentyFive as const;
          break;
        case 2:
          range = AgeRange.TwentySix_Thirty as const;
          break;
        case 3:
          range = AgeRange.ThirtyOne_ThirtyFive as const;
          break;
        case 4:
          range = AgeRange.ThirtySix_Forty as const;
          break;
        case 5:
          range = AgeRange.OverForty as const;
          break;
      }

      const users = await this.searchUserUseCase.searchUser({
        name,
        cpf,
        username,
        status,
        age_range: range,
        date_birth_start,
        date_birth_end,
        create_at_start,
        create_at_end,
        update_at_start,
        update_at_end,
        page: p,
      });

      return response.status(StatusCodes.OK).json(users);
    } catch (error: any) {
      if (error instanceof ValidationSchemaError) {
        return response.status(error.statusCode).json(error.errors);
      }
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  };

  getUserById = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const user = await this.searchUserUseCase.getUserById(id)

      return response.status(StatusCodes.OK).json(user);
    } catch (error: any) {
      if (error instanceof ValidationSchemaError) {
        return response.status(error.statusCode).json(error.errors);
      }
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  };
}
