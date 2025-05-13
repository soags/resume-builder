import { Prisma } from "@/generated/prisma/client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const techCategoryWithStacks = Prisma.validator<Prisma.TechCategoryDefaultArgs>()({
  include: { stacks: true },
});

export type TechCategoryWithStacks = Prisma.TechCategoryGetPayload<typeof techCategoryWithStacks>;

export type TechStackFormData = {
  name: string;
  label: string;
};
