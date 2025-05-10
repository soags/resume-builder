"use client";

import { Cert } from "@/generated/prisma/client";
import { CertItem } from "./CertItem";
import { NewCertForm } from "./NewCertForm";
import { useEffect, useState } from "react";
import { addCert, getCerts } from "../actions";
import { CertFormData } from "../schema";

export function CertList({
  resumeId,
  defaultCerts,
}: {
  resumeId: string;
  defaultCerts: Cert[];
}) {
  const [certs, setCerts] = useState(defaultCerts);

  useEffect(() => {
    console.log(certs);
  }, [certs]);

  const handleAdd = async (data: CertFormData) => {
    try {
      console.log("Adding cert:", resumeId, data);
      await addCert(resumeId, data);
      setCerts(await getCerts(resumeId));
    } catch (error) {
      console.error(
        `[CertList] Error adding cert for resumeId=${resumeId}:`,
        error,
      );
    }
  };

  return (
    <div className="space-y-4">
      {certs.map((cert) => (
        <CertItem key={cert.id} cert={cert} />
      ))}
      <NewCertForm onSubmit={handleAdd} />
    </div>
  );
}
