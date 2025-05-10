import { urlOrEmpty } from "@/lib/zod";
import { z } from "zod";

export const basicsSchema = z.object({
  title: z.string().min(1),
  name: z.string().min(1),
  label: z.string(),
  github: urlOrEmpty,
  qiita: urlOrEmpty,
  zenn: urlOrEmpty,
  speakerDeck: urlOrEmpty,
  slideShare: urlOrEmpty,
});

export type BasicsFormData = z.infer<typeof basicsSchema>;
