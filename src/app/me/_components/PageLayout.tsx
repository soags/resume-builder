type PageLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className="flex flex-col p-6">
      <div className="mb-8 flex items-center justify-between px-4">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="flex justify-center">{children}</div>
    </div>
  );
}
