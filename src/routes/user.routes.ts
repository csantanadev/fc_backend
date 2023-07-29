import { Router } from "express";
import { authenticateUserController } from "../modules/users/useCases/authenticate-user";
import { createUserController } from "../modules/users/useCases/create-user";
import { ensureAuthenticate } from "../infra/shared/http/middleware/ensure-authenticate.middleware";
import { updateUserController } from "../modules/users/useCases/update-user";
import { deleteUserController } from "../modules/users/useCases/delete-user";
import { passwordRecoveryController } from "../modules/users/useCases/password-recovery";

const userRoutes = Router();

userRoutes.post("/login", authenticateUserController.handle);

userRoutes.post("/users", ensureAuthenticate, createUserController.handle);
userRoutes.put("/users/:id", ensureAuthenticate, updateUserController.handle);
userRoutes.delete("/users", ensureAuthenticate, deleteUserController.handle);

// recovery
userRoutes.post(
  "/users/:id/password-recovery",
  passwordRecoveryController.recovery
);

userRoutes.patch(
    "/users/:id/change-password",
    passwordRecoveryController.changePassword
  );

export { userRoutes };
