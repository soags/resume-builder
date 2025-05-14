"use client";

import { useId, useState } from "react";
import { ProjectFormData, ProjectWithStacks } from "../schema";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { ProjectDialog } from "./ProjectDialog";
import { createProject, deleteProject, updateProject, updateProjectOrder } from "../actions";
import { withClientFeedback } from "@/lib/withClientFeedback";

export type ProjectListSectionProps = {
  resumeId: string;
  initialProjects: ProjectWithStacks[];
};

export function ProjectListSection({ resumeId, initialProjects }: ProjectListSectionProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [editingProject, setEditingProject] = useState<ProjectWithStacks | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const dndId = useId();

  const handleAddProject = () => {
    setEditingProject(null);
    setDialogOpen(true);
  };

  const handleSaveProject = async (data: ProjectFormData) => {
    await withClientFeedback(async () => {
      const result = editingProject
        ? await updateProject(resumeId, editingProject.id, data)
        : await createProject(resumeId, data);

      if (result.ok && result.data) {
        const updated = editingProject
          ? projects.map((p) => (p.id === result.data.id ? result.data : p))
          : [...projects, result.data];

        setProjects(updated);
        setDialogOpen(false);
        setEditingProject(null);
      }

      return result;
    });
  };

  const handleDeleteProject = async (projectId: string) => {
    await withClientFeedback(async () => {
      const result = await deleteProject(resumeId, projectId);
      if (result.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== projectId));
      }
      return result;
    });
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex((p) => p.id === active.id);
    const newIndex = projects.findIndex((p) => p.id === over.id);
    const reordered = arrayMove(projects, oldIndex, newIndex);

    setProjects(reordered);

    await withClientFeedback(
      async () =>
        await updateProjectOrder(
          resumeId,
          reordered.map((p, i) => ({ id: p.id, order: i })),
        ),
    );
  };

  return (
    <DndContext id={dndId} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={projects.map((project) => project.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="grid gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={(p) => {
                setEditingProject(p);
                setDialogOpen(true);
              }}
              onDelete={handleDeleteProject}
            />
          ))}
          <Button variant="outline" className="w-fit rounded-full" onClick={handleAddProject}>
            <Plus />
            プロジェクトを追加
          </Button>
        </div>
        <ProjectDialog
          initialProject={editingProject ?? { title: "", url: "", summary: "", stacks: [] }}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSave={handleSaveProject}
        />
      </SortableContext>
    </DndContext>
  );
}
