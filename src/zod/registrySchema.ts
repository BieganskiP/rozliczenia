import { z } from "zod";

const RegistryItemSchema = z.object({
  id: z.number(),
  date: z.string(),
  amount: z.number(),
  user_id: z.number(),
  wage: z.number(),
});

export const RegistrySchema = z.array(RegistryItemSchema);
export type Registry = z.infer<typeof RegistrySchema>;
