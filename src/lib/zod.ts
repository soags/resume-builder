import { z } from "zod";

export const urlOrEmpty = z.union([z.string().url(), z.literal("")]);

export const zz = {
  urlOrEmpty: () => z.union([z.string().url(), z.literal("")]),
};
