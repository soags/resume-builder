"use client";

import { Cert } from "@/generated/prisma/client";
import { NewCertForm } from "./NewCertForm";
import { useState } from "react";
import { addCert, deleteCert, updateCert } from "../actions";
import { CertFormData } from "../schema";
import { CertItem } from "./CertItem";
import { withClientLogging } from "@/lib/withClientLogging";

export function CertList({ resumeId, defaultCerts }: { resumeId: string; defaultCerts: Cert[] }) {
  const [certs, setCerts] = useState(defaultCerts);

  const handleAdd = async (data: CertFormData) => {
    await withClientLogging(
      async () => {
        const cert = await addCert(resumeId, data);
        if (cert) {
          setCerts([...certs, cert]);
        }
      },
      {
        context: "CertList.add",
        errorMessage: "資格の追加に失敗しました",
      },
    );
  };

  const handleUpdate = async (id: string, data: CertFormData) => {
    await withClientLogging(
      async () => {
        const newCert = await updateCert(id, data);
        if (newCert) {
          setCerts(certs.map((cert) => (cert.id === id ? newCert : cert)));
        }
      },
      {
        context: "CertList.update",
        errorMessage: "資格の更新に失敗しました",
      },
    );
  };

  const handleDelete = async (id: string) => {
    await withClientLogging(
      async () => {
        await deleteCert(id);
        setCerts(certs.filter((cert) => cert.id !== id));
      },
      {
        context: "CertList.delete",
        errorMessage: "資格の削除に失敗しました",
      },
    );
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
