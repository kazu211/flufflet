import { z } from "zod";

export const yearSchema = z.string().regex(/[0-9]{4}/);
export type Year = z.infer<typeof yearSchema>;

export const monthSchema = z.string().regex(/[0-9]{2}/);
export type Month = z.infer<typeof monthSchema>;

export const getRequestSchema = z.object({
  year: yearSchema,
  month: monthSchema.optional(),
})
export type GetRequest = z.infer<typeof getRequestSchema>;

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
  description: z.string(),
});
export type Item = z.infer<typeof itemSchema>;

export const CategorySchema = z.object({
  id: z.string(),
  type: transactionTypeSchema,
  category1: z.string(),
  category2: z.string(),
  color: z.string(),
});
export type Category = z.infer<typeof CategorySchema>

export const messageSchema = z.object({
  error: z.string(),
});
export type Message = z.infer<typeof messageSchema>;

export const getItemsResponseSchema = z.array(itemSchema);
export type GetItemsResponse = z.infer<typeof getItemsResponseSchema>;

export const postItemsResponseSchema = itemSchema.or(messageSchema);
export type PostItemsResponse = z.infer<typeof postItemsResponseSchema>;

export const deleteItemsResponseSchema = itemSchema.or(messageSchema);
export type DeleteItemsResponse = z.infer<typeof deleteItemsResponseSchema>;

export const putItemsResponseSchema = itemSchema.or(messageSchema);
export type PutItemsResponse = z.infer<typeof putItemsResponseSchema>;

export const getCategoriesResponseSchema = z.array(CategorySchema);
export type GetCategoriesResponse = z.infer<typeof getCategoriesResponseSchema>;
