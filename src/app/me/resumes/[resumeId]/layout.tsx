import { ResumeStoreSetter } from "./_components/ResumeStoreSetter";

export default async function ResumeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ResumeStoreSetter />
      {children}
    </>
  );
}
