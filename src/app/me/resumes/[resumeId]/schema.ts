import { zz } from "@/lib/zod";
import { z } from "zod";

export const resumeSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  name: z.string().min(1),
  label: z.string(),
  github: zz.urlOrEmpty(),
  qiita: zz.urlOrEmpty(),
  zenn: zz.urlOrEmpty(),
  speakerDeck: zz.urlOrEmpty(),
  slideShare: zz.urlOrEmpty(),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;
