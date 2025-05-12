"use server";

import prisma from "@/lib/prisma";
import { ProjectFormData, ProjectWithStacks } from "./schema";
import { revalidatePath } from "next/cache";

export async function getProjects(resumeId: string): Promise<ProjectWithStacks[]> {
  return prisma.project.findMany({
    where: { resumeId },
    include: { stacks: true },
    orderBy: { order: "asc" },
  });
}

export async function createProject(resumeId: string, data: ProjectFormData): Promise<ProjectWithStacks> {
  const lastProject = await prisma.project.findFirst({
    where: { resumeId },
    orderBy: { order: "desc" },
  });

  const order = lastProject ? lastProject.order + 1 : 0;

  const project = await prisma.project.create({
    data: {
      resumeId,
      title: data.title,
      summary: data.summary,
      url: data.url,
      order,
      stacks: {
        create: data.stacks.map((stack, index) => ({
          name: stack.name,
          label: stack.label,
          order: index,
        })),
      },
    },
    include: { stacks: true },
  });

  revalidatePath(`/me/resumes/${resumeId}/projects`);
  return project;
}

export async function updateProject(
  resumeId: string,
  projectId: string,
  data: ProjectFormData,
): Promise<ProjectWithStacks> {
  // 既存のスタックを削除
  await prisma.projectTechStack.deleteMany({
    where: { projectId },
  });

  const project = await prisma.project.update({
    where: { id: projectId },
    data: {
      title: data.title,
      summary: data.summary,
      url: data.url,
      stacks: {
        create: data.stacks.map((stack, index) => ({
          name: stack.name,
          label: stack.label,
          order: index,
        })),
      },
    },
    include: { stacks: true },
  });

  revalidatePath(`/me/resumes/${resumeId}/projects`);
  return project;
}

export async function updateProjectOrder(resumeId: string, projects: { id: string; order: number }[]): Promise<void> {
  await Promise.all(
    projects.map((project) =>
      prisma.project.update({
        where: { id: project.id },
        data: { order: project.order },
      }),
    ),
  );

  revalidatePath(`/me/resumes/${resumeId}/projects`);
}

export async function deleteProject(resumeId: string, projectId: string): Promise<void> {
  await prisma.project.delete({
    where: { id: projectId },
  });

  revalidatePath(`/me/resumes/${resumeId}/projects`);
}
