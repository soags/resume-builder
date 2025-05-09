import { z } from "zod";

export const certSchema = z.object({
  name: z.string().min(1),
  year: z.number().int().positive(),
  month: z.number().int().positive(),
  issuer: z.string().or(z.literal("")),
  url: z.string().url().or(z.literal("")),
});

export type CertFormData = z.infer<typeof certSchema>;
