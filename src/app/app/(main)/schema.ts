import {z } from "zod"
 
export const upsertProductSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  amount: z.union([z.string().transform((val) => val === "" ? undefined : parseFloat(val)), z.number()]),
  value: z.union([z.string().transform((val) => val === "" ? undefined : parseFloat(val)), z.number()]),
})

export const deleteProductSchema = z.object({
  id: z.string(),
})