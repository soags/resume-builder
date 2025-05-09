export function Header({ title }: { title: string }) {
  return (
    <header className="mb-8">
      <h2 className="text-2xl font-bold">{title}</h2>
    </header>
  );
}
