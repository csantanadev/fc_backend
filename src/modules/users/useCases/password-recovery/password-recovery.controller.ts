import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PasswordRecoveryUseCase } from "./password-recovery.usecase";

import { validatorSchema } from "../../../../infra/shared/validator/zod";

import { ValidationSchemaError } from "../../../../errors/validation-schema.error";
import { createUserSchema } from "../create-user/create-user.schema";
import {
  changePasswordSchema,
  pswRecoverySchema,
} from "./password-recovery.schema";

export class PasswordRecoveryController {
  constructor(
    private readonly passwordRecoveryUseCase: PasswordRecoveryUseCase
  ) {}

  recovery = async (request: Request, response: Response) => {
    try {
      const { body, params } = request;

      // validação de schema
      validatorSchema(pswRecoverySchema, body);

      const passwordRecovery = await this.passwordRecoveryUseCase.recovery(
        body,
        params.id
      );

      return response.status(StatusCodes.OK).json(passwordRecovery);
    } catch (error: any) {
      if (error instanceof ValidationSchemaError) {
        return response.status(error.statusCode).json(error.errors);
      }
      return response.status(error.statusCode).json({ message: error.message });
    }
  };

  changePassword = async (request: Request, response: Response) => {
    try {
      const { body, params } = request;

      // validação de schema
      validatorSchema(changePasswordSchema, body);

      await this.passwordRecoveryUseCase.changePassword(
        body.password,
        params.id
      );

      return response.status(StatusCodes.NO_CONTENT).end();
    } catch (error: any) {
      if (error instanceof ValidationSchemaError) {
        return response.status(error.statusCode).json(error.errors);
      }
      return response.status(error.statusCode).json({ message: error.message });
    }
  };
}
