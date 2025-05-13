"use server";

import { Cert } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { CertFormData } from "./schema";
import { revalidatePath } from "next/cache";

export async function getCerts(resumeId: string): Promise<Cert[]> {
  return prisma.cert.findMany({
    where: { resumeId },
    orderBy: [{ year: "desc" }, { month: "desc" }],
  });
}

export async function addCert(resumeId: string, data: CertFormData): Promise<Cert> {
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
}

export async function updateCert(id: string, data: CertFormData): Promise<Cert> {
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
}

export async function deleteCert(id: string): Promise<void> {
  await prisma.cert.delete({ where: { id } });
  revalidatePath("/me/resumes/[resumeId]/certs");
}
