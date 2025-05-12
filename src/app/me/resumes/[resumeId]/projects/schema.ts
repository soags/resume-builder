import { Prisma } from "@/generated/prisma/client";
import { zz } from "@/lib/zod";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const projectWithStacks = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  include: { stacks: true },
});

export type ProjectWithStacks = Prisma.ProjectGetPayload<typeof projectWithStacks>;

const techStackSchema = z.object({
  name: z.string(),
  label: z.string(),
});

export const projectSchema = z.object({
  title: z.string().min(1),
  url: zz.urlOrEmpty(),
  summary: z.string(),
  stacks: z.array(techStackSchema),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
