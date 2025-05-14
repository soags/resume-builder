import { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const findIndexById = <T extends { id: UniqueIdentifier }>(list: T[], id: UniqueIdentifier) =>
  list.findIndex((item) => item.id === id);

export const handleDragEnd =
  <T extends { id: UniqueIdentifier }>({
    items,
    onMove,
  }: {
    items: () => T[];
    onMove: (items: T[]) => void;
  }) =>
  (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const list = items();
    const oldIndex = findIndexById(list, active.id);
    const newIndex = findIndexById(list, over.id);

    const moved = arrayMove(list, oldIndex, newIndex);
    onMove(moved);
  };
