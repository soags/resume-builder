"use client";

import { Cert } from "@/generated/prisma/client";
import { NewCertForm } from "./NewCertForm";
import { useState } from "react";
import { addCert, deleteCert, getCerts, updateCert } from "../actions";
import { CertFormData } from "../schema";
import { CertItem } from "./CertItem";

export function CertList({ resumeId, defaultCerts }: { resumeId: string; defaultCerts: Cert[] }) {
  const [certs, setCerts] = useState(defaultCerts);

  const reloadCerts = async () => {
    setCerts(await getCerts(resumeId));
  };

  const handleAdd = async (data: CertFormData) => {
    try {
      await addCert(resumeId, data);
      await reloadCerts();
    } catch (error) {
      console.error(`[CertList] Error adding cert for resumeId=${resumeId}:`, error);
    }
  };

  const handleUpdate = async (id: string, data: CertFormData) => {
    try {
      await updateCert(id, data);
      await reloadCerts();
    } catch (error) {
      console.error(
        `[CertList] Error updating cert with id=${id} for resumeId=${resumeId}:`,
        error,
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCert(id);
      await reloadCerts();
    } catch (error) {
      console.error(`[CertList] Error deleting cert with id=${id}:`, error);
    }
  };

  return (
    <div className="space-y-4">
      {certs.map((cert) => (
        <CertItem key={cert.id} cert={cert} onSubmit={handleUpdate} onDelete={handleDelete} />
      ))}
      <NewCertForm onSubmit={handleAdd} />
    </div>
  );
}
