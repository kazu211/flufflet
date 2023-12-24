import { z } from "zod";

export const transactionTypeSchema = z.enum(["支出", "収入"]);
export type TransactionType = z.infer<typeof transactionTypeSchema>;

export const itemSchema = z.object({
  id: z.string(),
  date: z.string(),
  type: transactionTypeSchema,
  category1: z.string(),
  category2: z.string(),
  amount: z.number(),
  tags: z.string(),
  description: z.string(),
});
export type Item = z.infer<typeof itemSchema>;
