import { z } from "zod";

export const urlOrEmpty = z.union([z.string().url(), z.literal("")]);
