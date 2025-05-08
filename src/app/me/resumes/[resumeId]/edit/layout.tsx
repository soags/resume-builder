import { SectionLink } from "./_components/section-link";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ resumeId: string }>;
  children: React.ReactNode;
}) {
  const { resumeId } = await params;

  return (
    <div className="flex justify-center p-6">
      <div className="flex w-full max-w-5xl">
        <div className="w-full p-4">
          <div className="rounded-lg border border-slate-300 p-2">
            <nav className="flex flex-col space-y-2">
              <SectionLink href={`/me/resumes/${resumeId}/edit/basics`}>
                基本情報
              </SectionLink>
              <SectionLink href={`/me/resumes/${resumeId}/edit/tech`}>
                技術スタック
              </SectionLink>
              <SectionLink href={`/me/resumes/${resumeId}/edit/skills`}>
                スキル
              </SectionLink>
              <SectionLink href={`/me/resumes/${resumeId}/edit/work`}>
                職務経歴
              </SectionLink>
              <SectionLink href={`/me/resumes/${resumeId}/edit/promotions`}>
                自己PR
              </SectionLink>
              <SectionLink href={`/me/resumes/${resumeId}/edit/projects`}>
                業務外活動
              </SectionLink>
              <SectionLink href={`/me/resumes/${resumeId}/edit/certs`}>
                資格
              </SectionLink>
            </nav>
          </div>
        </div>
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
}
