import { SectionLink } from "./_components/section-link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center p-6">
      <div className="flex w-full max-w-5xl">
        <div className="w-full p-4">
          <div className="rounded-lg border border-slate-300 p-2">
            <nav className="flex flex-col space-y-2">
              <SectionLink to="./basics">基本情報</SectionLink>
              <SectionLink to="./tech">技術スタック</SectionLink>
              <SectionLink to="./skill">スキル</SectionLink>
              <SectionLink to="./work">職務経歴</SectionLink>
              <SectionLink to="./promotions">自己PR</SectionLink>
              <SectionLink to="./projects">業務外活動</SectionLink>
              <SectionLink to="./certs">資格</SectionLink>
            </nav>
          </div>
        </div>
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
}
