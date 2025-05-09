import { z } from "zod";

export const certSchema = z.object({
  name: z.string().min(1),
  year: z.number().or(z.literal("")),
  month: z.number().or(z.literal("")),
  issuer: z.string().or(z.literal("")),
  url: z.string().url().or(z.literal("")),
});

export type CertFormData = z.infer<typeof certSchema>;
