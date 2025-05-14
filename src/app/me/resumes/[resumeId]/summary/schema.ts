import { zz } from "@/lib/zod";
import { z } from "zod";

export const summarySchema = z.object({
  summary: zz.string("職務要約"),
});

export type SummaryFormData = z.infer<typeof summarySchema>;
