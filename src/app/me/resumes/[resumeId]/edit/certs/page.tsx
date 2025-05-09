import { Header } from "../_components/Header";
import { CertList } from "./_components/CertList";
import { getCerts } from "./actions";

export default async function CertsPage({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;

  const certs = await getCerts(resumeId);

  return (
    <>
      <Header title="資格" />
      <CertList defaultCerts={certs} />
    </>
  );
}
