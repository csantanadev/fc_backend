import { z } from "zod";

export const searchUsersSchema = z.object({
  name: z.string().optional(),
  cpf: z.string().length(11, "You need to insert a valid cpf").optional(),
  username: z.string().optional(),
  status: z.string().optional(),
  mother_name: z.string().optional(),
  age_range: z.number().optional(),
  date_birth_start: z.string().optional(),
  date_birth_end: z.string().optional(),
  create_at_start: z.string().optional(),
  create_at_end: z.string().optional(),
  update_at_start: z.string().optional(),
  update_at_end: z.string().optional(),
});
