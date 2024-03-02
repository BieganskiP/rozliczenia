import { z } from "zod";

const InvitesSchema = z.object({
  id: z.number(),
  email: z.string(),
  token: z.string(),
  createdAt: z.date(),
  expiresAt: z.date(),
});

export const InviteSchema = z.array(InvitesSchema);
export type Invite = z.infer<typeof InviteSchema>;
