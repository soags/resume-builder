"use server";

import prisma from "@/lib/prisma";
import { ProjectFormData } from "./schema";
import { revalidatePath } from "next/cache";
import { withServerLogging } from "@/lib/withServerLogging";

export const getProjects = async (resumeId: string) =>
  await withServerLogging(async () => {
    const projects = await prisma.project.findMany({
      where: { resumeId },
      include: { stacks: true },
      orderBy: { order: "asc" },
    });

    return { ok: true, data: projects };
  }, "getProjects");

export const createProject = async (resumeId: string, data: ProjectFormData) =>
  await withServerLogging(async () => {
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

    return { ok: true, data: project };
  }, "createProject");

export const updateProject = async (resumeId: string, projectId: string, data: ProjectFormData) =>
  await withServerLogging(async () => {
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

    return { ok: true, data: project };
  }, "updateProject");

export const updateProjectOrder = async (
  resumeId: string,
  projects: { id: string; order: number }[],
) =>
  await withServerLogging(async () => {
    await Promise.all(
      projects.map((project) =>
        prisma.project.update({
          where: { id: project.id },
          data: { order: project.order },
        }),
      ),
    );

    revalidatePath(`/me/resumes/${resumeId}/projects`);

    return { ok: true, data: null };
  }, "updateProjectOrder");

export const deleteProject = async (resumeId: string, projectId: string) =>
  await withServerLogging(async () => {
    await prisma.project.delete({
      where: { id: projectId },
    });

    revalidatePath(`/me/resumes/${resumeId}/projects`);

    return { ok: true, data: null };
  }, "deleteProject");
