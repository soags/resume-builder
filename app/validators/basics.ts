import { z } from 'zod'

export const basicsSchema = z.object({
  name: z.string().min(1).max(50),
  label: z.string().max(50),
})
