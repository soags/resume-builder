import { BasicsForm } from "./_components/BasicsForm";
import { Header } from "../_components/Header";
import { getResume } from "./actions";

export default async function BasicsPage({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;

  const resume = await getResume(resumeId);
  if (!resume) {
    return <div>職務経歴書が存在しませんわ……😢</div>;
  }

  return (
    <>
      <Header title="基本情報" />
      <BasicsForm resume={resume} />
    </>
  );
}
