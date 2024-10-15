import { z } from "zod";

export const upsertExpirationSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  expiration: z.coerce.date().min(new Date()),
});

export const deleteExpirationSchema = z.object({
  id: z.string(),
});
