import { z } from "zod";

export const promotionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  body: z.string().min(1),
});

export type PromotionFormData = z.infer<typeof promotionSchema>;
