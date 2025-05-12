import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectWithStacks } from "../schema";
import { DeleteIconButton } from "@/components/DeleteIconButton";
import { DragHandle } from "@/components/DragHandle";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type ProjectCardProps = {
  project: ProjectWithStacks;
  onEdit: (project: ProjectWithStacks) => void;
  onDelete: (projectId: string) => void;
};

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: project.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dragHandleProps = {
    ...attributes,
    ...listeners,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        className="hover:bg-muted/50 grid cursor-pointer gap-3 transition hover:shadow-sm"
        onClick={() => onEdit?.(project)}
      >
        <CardHeader className="px-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DragHandle dragHandleProps={dragHandleProps} />
              <div className="text-base font-semibold">{project.title}</div>
            </div>
            <DeleteIconButton tooltip="プロジェクトを削除" onClick={() => onDelete(project.id)} />
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          <p className="text-muted-foreground line-clamp-2 text-sm">{project.summary}</p>
          <a href={project.url} className="text-sm break-all text-blue-600 hover:underline">
            {project.url}
          </a>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.stacks.map((stack) => (
              <Badge key={stack.id} className="rounded-full px-2 text-sm">
                {stack.label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
