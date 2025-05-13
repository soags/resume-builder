"use client";

import { HighlightForm, HighlightFormProps } from "./HighlightForm";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortableHighlightFormProps = Omit<HighlightFormProps, "dragHandleProps">;

export function SortableHighlightForm({ highlight, ...props }: SortableHighlightFormProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: highlight.id,
  });

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
      <HighlightForm highlight={highlight} dragHandleProps={dragHandleProps} {...props} />
    </div>
  );
}
