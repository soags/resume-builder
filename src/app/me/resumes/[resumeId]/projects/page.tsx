import { Header } from "../_components/Header";
import { ProjectListSection } from "./_components/ProjectListSection";
import { getProjects } from "./actions";

export default async function PromotionsPage({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;
  const projects = await getProjects(resumeId);

  return (
    <>
      <Header title="プロジェクト" />
      <div className="grid gap-4">
        <ProjectListSection resumeId={resumeId} initialProjects={projects} />
      </div>
    </>
  );
}
