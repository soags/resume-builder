import { GripVertical } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

export function DragHandle({ dragHandleProps }: { dragHandleProps: ComponentPropsWithoutRef<"div"> }) {
  return (
    <div {...dragHandleProps} className="cursor-grab">
      <GripVertical className="text-muted-foreground h-4 w-4" />
    </div>
  );
}
