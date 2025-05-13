import { z } from "zod";

export const newResumeSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
});

export type NewResumeFormData = z.infer<typeof newResumeSchema>;
