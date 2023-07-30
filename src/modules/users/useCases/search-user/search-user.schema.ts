import { z } from "zod";

export const pswRecoverySchema = z.object({
  cpf: z.string().length(11, "You need to insert a valid cpf"),
  mother_name: z.string(),
  email: z.string().email({
    message: "You need to insert a valid email",
  }),
});

export const changePasswordSchema = z.object({
  password: z.string(),
});
