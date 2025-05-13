import { urlOrEmpty } from "@/lib/zod";
import { z } from "zod";

export const resumeSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  name: z.string().min(1),
  label: z.string(),
  github: urlOrEmpty,
  qiita: urlOrEmpty,
  zenn: urlOrEmpty,
  speakerDeck: urlOrEmpty,
  slideShare: urlOrEmpty,
});

export type ResumeFormData = z.infer<typeof resumeSchema>;
