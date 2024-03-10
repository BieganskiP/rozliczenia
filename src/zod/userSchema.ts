import { z } from "zod";

export const UserSchema = z.object({
  car: z.string(),
  id: z.number(),
  role: z.string(),
  name: z.string(),
  email: z.string(),
  region: z.string(),
  wage: z.number(),
});

export type User = z.infer<typeof UserSchema>;
