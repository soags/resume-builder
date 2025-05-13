"use server";

import { Cert } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { CertFormData } from "./schema";
import { revalidatePath } from "next/cache";
import { withLogging } from "@/lib/withLogging";

export const getCerts = (resumeId: string) =>
  withLogging(
    async (): Promise<Cert[]> =>
      prisma.cert.findMany({
        where: { resumeId },
        orderBy: [{ year: "desc" }, { month: "desc" }],
      }),
    "getCerts",
  );

export const addCert = (resumeId: string, data: CertFormData) =>
  withLogging(async (): Promise<Cert> => {
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
    return cert;
  }, "addCert");

export const updateCert = (id: string, data: CertFormData) =>
  withLogging(async (): Promise<Cert> => {
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
    return cert;
  }, "updateCert");

export const deleteCert = (id: string) =>
  withLogging(async (): Promise<void> => {
    await prisma.cert.delete({ where: { id } });
    revalidatePath("/me/resumes/[resumeId]/certs");
  }, "deleteCert");
