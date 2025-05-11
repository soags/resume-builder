import { Prisma } from "@/generated/prisma/client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const techCategoryWithStacks =
  Prisma.validator<Prisma.TechCategoryDefaultArgs>()({
    include: { stacks: true },
  });

export type TechCategoryWithSkills = Prisma.TechCategoryGetPayload<
  typeof techCategoryWithStacks
>;
