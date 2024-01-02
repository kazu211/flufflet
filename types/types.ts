import { z } from "zod";

export const idSchema = z.string();
export type Id = z.infer<typeof idSchema>;

export const transactionTypeSchema = z.enum(["支出", "収入"]);
export type TransactionType = z.infer<typeof transactionTypeSchema>;

export const itemSchema = z.object({
  id: idSchema,
  date: z.string(),
  type: transactionTypeSchema,
  category1: z.string(),
  category2: z.string(),
  amount: z.number(),
  tags: z.string(),
  description: z.string(),
});
export type Item = z.infer<typeof itemSchema>;

export const messageSchema = z.object({
  info: z.string().optional(),
  error: z.string().optional(),
});
export type Message = z.infer<typeof messageSchema>;

export const getResponseSchema = z.array(itemSchema);
export type GetResponse = z.infer<typeof getResponseSchema>;

export const postResponseSchema = itemSchema.or(messageSchema);
export type PostResponse = z.infer<typeof postResponseSchema>;

export const deleteResponseSchema = messageSchema;
export type DeleteResponse = z.infer<typeof deleteResponseSchema>;

export const putResponseSchema = itemSchema.or(messageSchema);
export type PutResponse = z.infer<typeof putResponseSchema>;
