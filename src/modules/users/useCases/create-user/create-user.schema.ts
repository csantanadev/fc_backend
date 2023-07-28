import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
  email: z.string().email({
    message: "You need to insert a valid email",
  }),
  phone: z.string(),
  cpf: z.string().length(11, "You need to insert a valid cpf"),
  date_birth: z.string(),
  mother_name: z.string(),
});
