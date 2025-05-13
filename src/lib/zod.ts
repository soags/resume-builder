import { z } from "zod";

export const zz = {
  urlOrEmpty: () => z.union([z.string().url(), z.literal("")]),
};
