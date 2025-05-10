"use server";

import { Cert } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { CertFormData } from "./schema";

export async function getCerts(resumeId: string): Promise<Cert[]> {
  try {
    return prisma.cert.findMany({
      where: { resumeId },
      orderBy: { year: "desc", month: "desc" },
    });
  } catch (error) {
    console.error(
      `[getCerts] Error fetching Certs for resumeId=${resumeId}:`,
      error,
    );
    throw new Error("Failed to fetch Certs");
  }
}

export async function addCert(
  resumeId: string,
  data: CertFormData,
): Promise<Cert> {
  try {
    return prisma.cert.create({
      data: {
        resumeId,
        name: data.name,
        year: data.year,
        month: data.month,
        issuer: data.issuer,
        url: data.url,
      },
    });
  } catch (error) {
    console.error("Error creating Cert:", error);
    throw new Error("Failed to create Cert");
  }
}

export async function updateCert(
  id: string,
  data: CertFormData,
): Promise<Cert> {
  try {
    return prisma.cert.update({
      where: { id },
      data: {
        name: data.name,
        year: data.year,
        month: data.month,
        issuer: data.issuer,
        url: data.url,
      },
    });
  } catch (error) {
    console.error("Error updating Cert:", error);
    throw new Error("Failed to update Cert");
  }
}

export async function deleteCert(id: string): Promise<void> {
  try {
    await prisma.cert.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting Cert:", error);
    throw new Error("Failed to delete Cert");
  }
}
