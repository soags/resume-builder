import { urlOrEmpty } from "@/lib/zod";
import { z } from "zod";

export const certSchema = z.object({
  name: z.string().min(1),
  year: z.number().int().positive(),
  month: z.number().int().positive(),
  issuer: z.string(),
  url: urlOrEmpty,
});

export type CertFormData = z.infer<typeof certSchema>;
