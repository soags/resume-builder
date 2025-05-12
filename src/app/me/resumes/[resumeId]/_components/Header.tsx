type HeaderProps = {
  title: string;
  slot?: React.ReactNode;
};

export function Header({ title, slot }: HeaderProps) {
  return (
    <header className="mb-8 flex items-center justify-between">
      <h2 className="text-2xl font-bold">{title}</h2>
      {slot}
    </header>
  );
}
