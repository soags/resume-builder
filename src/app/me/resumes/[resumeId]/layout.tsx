import { SectionLink } from "./_components/SectionLink";

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
              <SectionLink href={`/me/resumes/${resumeId}/basics`}>基本情報</SectionLink>
              <SectionLink href={`/me/resumes/${resumeId}/tech`}>技術スタック</SectionLink>
              <SectionLink href={`/me/resumes/${resumeId}/highlights`}>ハイライト</SectionLink>
              <SectionLink href={`/me/resumes/${resumeId}/work`}>職務経歴</SectionLink>
              <SectionLink href={`/me/resumes/${resumeId}/promotions`}>自己PR</SectionLink>
              <SectionLink href={`/me/resumes/${resumeId}/projects`}>業務外活動</SectionLink>
              <SectionLink href={`/me/resumes/${resumeId}/certs`}>資格</SectionLink>
            </nav>
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="w-3xl rounded-lg border border-slate-300 p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
