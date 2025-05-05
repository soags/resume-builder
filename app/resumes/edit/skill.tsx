import { Button } from '~/components/ui/button'
import { getSkills } from '~/models/skill.server'
import type { Route } from './+types/skill'
import { useState } from 'react'
import { Input } from '~/components/ui/input'
import { PlusIcon, Trash2Icon } from 'lucide-react'

export async function loader({ params }: Route.LoaderArgs) {
  const skills = await getSkills(params.resumeId)
  return skills
}

export default function Skill({}: Route.ComponentProps) {
  const [skills, setSkills] = useState<string[]>([])

  const handleAddSkill = (index: number) => {
    const newSkills = [...skills]
    newSkills.splice(index + 1, 0, '')
    setSkills(newSkills)
  }

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skills]
    newSkills[index] = value
    setSkills(newSkills)
  }

  return (
    <div className="w-3xl rounded-lg border border-slate-300 p-8">
      <div className="space-y-4">
        {skills.length ? (
          skills.map((skill, index) => (
            <SkillField
              key={index}
              value={skill}
              count={skills.length}
              index={index}
              onChange={handleSkillChange}
              onAdd={handleAddSkill}
              onRemove={handleRemoveSkill}
            />
          ))
        ) : (
          <SkillField
            value=""
            count={1}
            index={0}
            onChange={handleSkillChange}
            onAdd={handleAddSkill}
            onRemove={handleRemoveSkill}
          />
        )}
      </div>
    </div>
  )
}

function SkillField({
  value,
  count,
  index,
  onChange,
  onAdd,
  onRemove,
}: {
  value: string
  count: number
  index: number
  onChange: (index: number, value: string) => void
  onAdd: (index: number) => void
  onRemove: (index: number) => void
}) {
  return (
    <div key={index} className="flex items-center gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
        placeholder={`スキル ${index + 1}`}
      />
      {count > 1 && (
        <Button variant="outline" size="icon" onClick={() => onRemove(index)}>
          <Trash2Icon />
        </Button>
      )}
      <Button variant="outline" size="icon" onClick={() => onAdd(index)}>
        <PlusIcon />
      </Button>
    </div>
  )
}
