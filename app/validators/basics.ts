import { z } from 'zod'

export const ResumeBasicsSchema = z.object({
  title: z.string().min(1).max(50),
  name: z.string().min(1).max(50),
  label: z.string().max(50),
})

export type ResumeBasicsInput = z.infer<typeof ResumeBasicsSchema>
