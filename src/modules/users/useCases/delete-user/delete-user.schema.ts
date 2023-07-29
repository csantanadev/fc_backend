import { z } from "zod";

export const deleteUserSchema = z.array(z.string());
