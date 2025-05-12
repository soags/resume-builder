import { Badge } from "@/components/ui/badge";

type TechStackBadgesProps = {
  stacks: { name: string; label: string }[];
};

export function TechStackBadges({ stacks }: TechStackBadgesProps) {
  if (stacks.length === 0) {
    return <p className="text-muted-foreground text-sm">技術スタック未設定</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {stacks.map((stack) => (
        <Badge key={stack.name} className="rounded-full px-2 text-sm">
          {stack.label}
        </Badge>
      ))}
    </div>
  );
}
