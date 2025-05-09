import { Cert } from "@/generated/prisma/client";
import { CertItem } from "./CertItem";
import { NewCertForm } from "./NewCertForm";

export function CertList({ defaultCerts }: { defaultCerts: Cert[] }) {
  return (
    <>
      <div className="space-y-4">
        {defaultCerts.map((cert) => (
          <CertItem key={cert.id} cert={cert} />
        ))}
        <NewCertForm />
      </div>
    </>
  );
}
