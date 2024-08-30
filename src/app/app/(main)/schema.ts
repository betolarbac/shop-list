import {z } from "zod"
 
export const upsertProductSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  amount: z.string().optional(),
  value: z.string().optional(),
})