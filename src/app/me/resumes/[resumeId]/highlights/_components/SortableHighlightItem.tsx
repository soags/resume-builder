"use client";

import { HighlightItem } from "./HighlightItem";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ComponentPropsWithoutRef } from "react";

type SortableHighlightItemProps = {
  id: string;
  index: number;
  dragHandleProps?: ComponentPropsWithoutRef<"div">;
};

export function SortableHighlightItem({ id, ...props }: SortableHighlightItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
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
      <HighlightItem dragHandleProps={dragHandleProps} {...props} />
    </div>
  );
}
