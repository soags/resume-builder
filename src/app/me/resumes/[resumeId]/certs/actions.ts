"use server";

import prisma from "@/lib/prisma";
import { CertFormData } from "./schema";
import { revalidatePath } from "next/cache";
import { withServerLogging } from "@/lib/withServerLogging";

export const getCerts = async (resumeId: string) =>
  await withServerLogging(async () => {
    const certs = await prisma.cert.findMany({
      where: { resumeId },
      orderBy: [{ year: "desc" }, { month: "desc" }],
    });

    return { ok: true, data: certs };
  }, "getCerts");

export const addCert = async (resumeId: string, data: CertFormData) =>
  await withServerLogging(async () => {
    const cert = prisma.cert.create({
      data: {
        resumeId,
        name: data.name,
        year: data.year,
        month: data.month,
        issuer: data.issuer,
        url: data.url,
      },
    });

    revalidatePath("/me/resumes/[resumeId]/certs");

    return { ok: true, data: cert };
  }, "addCert");

export const updateCert = async (id: string, data: CertFormData) =>
  await withServerLogging(async () => {
    const cert = prisma.cert.update({
      where: { id },
      data: {
        name: data.name,
        year: data.year,
        month: data.month,
        issuer: data.issuer,
        url: data.url,
      },
    });

    revalidatePath("/me/resumes/[resumeId]/certs");

    return { ok: true, data: cert };
  }, "updateCert");

export const deleteCert = async (id: string) =>
  await withServerLogging(async () => {
    await prisma.cert.delete({ where: { id } });

    revalidatePath("/me/resumes/[resumeId]/certs");

    return { ok: true, data: null };
  }, "deleteCert");
