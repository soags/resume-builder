import { z } from "zod";

export const resumeSchema = z.object({
  title: z.string().min(1, "職務経歴書のタイトルを入力してください"),
  name: z.string().min(1, "名前を入力してください"),
  label: z.string(),
  github: z.string().url().or(z.literal("")),
  qiita: z.string().url().or(z.literal("")),
  zenn: z.string().url().or(z.literal("")),
  speakerDeck: z.string().url().or(z.literal("")),
  slideShare: z.string().url().or(z.literal("")),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;
