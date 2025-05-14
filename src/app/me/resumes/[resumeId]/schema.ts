import { zz } from "@/lib/zod";
import { z } from "zod";

export const resumeSchema = z.object({
  slug: zz.string("Slug"),
  title: zz.string("タイトル"),
  name: zz.string("名前"),
  label: zz.stringOrEmpty(),
  github: zz.urlOrEmpty(),
  qiita: zz.urlOrEmpty(),
  zenn: zz.urlOrEmpty(),
  speakerDeck: zz.urlOrEmpty(),
  slideShare: zz.urlOrEmpty(),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;
