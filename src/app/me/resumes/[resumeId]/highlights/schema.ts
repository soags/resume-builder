import { z } from "zod";

export const highlightSchema = z
  .object({
    id: z.string(),
    text: z.string(),
    order: z.number().optional(),
    isNew: z.boolean(),
    isDeleted: z.boolean(),
  })
  .superRefine((val, ctx) => {
    if (!val.isDeleted && !val.text?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["text"],
        message: "ハイライトは必須です",
      });
    }
  });

export const highlightListSchema = z.object({
  highlights: z.array(highlightSchema),
});

export type HighlightFormValues = z.infer<typeof highlightSchema>;

export type HighlightListFormValues = z.infer<typeof highlightListSchema>;
