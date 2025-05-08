import { Button } from "@/components/ui/button";
import { getSkillsByResume } from "@/features/resumes/models/skills";

export default async function SkillPage({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;

  const skills = await getSkillsByResume(resumeId);

  return (
    <div className="w-3xl rounded-lg border border-slate-300 p-8">
      <header className="mb-8">
        <h2 className="text-2xl font-bold">スキル</h2>
      </header>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id}>{JSON.stringify(skill)}</div>
        ))}
      </div>
      <div className="mt-6 flex gap-8">
        <Button type="submit" className="flex-1 bg-sky-800 hover:bg-sky-950">
          保存
        </Button>
        <Button type="reset" className="flex-1" variant="outline">
          元に戻す
        </Button>
      </div>
    </div>
  );
}
