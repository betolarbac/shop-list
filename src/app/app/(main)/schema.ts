import {z } from "zod"
 
export const upsertProductSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  amount: z.union([z.string().transform((val) => parseFloat(val)), z.number()]),
  value: z.union([z.string().transform((val) => parseFloat(val)), z.number()]),
})