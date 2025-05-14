"use client";

import { Cert } from "@/generated/prisma/client";
import { NewCertForm } from "./NewCertForm";
import { useState } from "react";
import { addCert, deleteCert, updateCert } from "../actions";
import { CertFormData } from "../schema";
import { CertItem } from "./CertItem";
import { withClientFeedback } from "@/lib/withClientFeedback";

export function CertList({ resumeId, defaultCerts }: { resumeId: string; defaultCerts: Cert[] }) {
  const [certs, setCerts] = useState(defaultCerts);

  const handleAdd = async (data: CertFormData) => {
    await withClientFeedback(async () => {
      const result = await addCert(resumeId, data);
      if (result.ok && result.data) {
        setCerts([...certs, result.data]);
      }
      return result;
    });
  };

  const handleUpdate = async (id: string, data: CertFormData) => {
    await withClientFeedback(async () => {
      const result = await updateCert(id, data);
      if (result.ok && result.data) {
        setCerts(certs.map((cert) => (cert.id === id ? result.data : cert)));
      }
      return result;
    });
  };

  const handleDelete = async (id: string) => {
    await withClientFeedback(async () => {
      const result = await deleteCert(id);
      if (result.ok) {
        setCerts(certs.filter((cert) => cert.id !== id));
      }
      return result;
    });
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
