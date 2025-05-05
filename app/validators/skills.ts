import { z } from 'zod'

export const SkillSchema = z.object({
  title: z.string().min(0).max(200),
  orderNo: z.number().int(),
})

export const SkillsSchema = z.array(SkillSchema)

export type SkillInput = z.infer<typeof SkillSchema>

export type SkillsInput = z.infer<typeof SkillsSchema>
