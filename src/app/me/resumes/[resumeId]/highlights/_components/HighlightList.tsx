"use client";

import { useEffect, useId, useState } from "react";
import { getHighlights, addHighlight, deleteHighlight, updateHighlight, updateHighlightOrder } from "../actions";
import { Highlight } from "@/generated/prisma/client";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDebouncedCallback } from "use-debounce";
import { SortableHighlightForm } from "./SortableHighlightForm";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";

export function HighlightList({ resumeId, initial }: { resumeId: string; initial: Highlight[] }) {
  const [highlights, setHighlights] = useState(initial);
  const dndId = useId();

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const data = await getHighlights(resumeId);
        setHighlights(data);
      } catch (error) {
        console.error(`[HighlightList] Error fetching highlights for resumeId=${resumeId}:`, error);
      }
    };
    fetchHighlights();
  }, [resumeId]);

  const handleAdd = async () => {
    try {
      await addHighlight(resumeId);
      const data = await getHighlights(resumeId);
      setHighlights(data);
    } catch (error) {
      console.error(`[HighlightList] Error adding highlight for resumeId=${resumeId}:`, error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteHighlight(resumeId, id);
      const data = await getHighlights(resumeId);
      setHighlights(data);
    } catch (error) {
      console.error(`[HighlightList] Error deleting highlight with id=${id}:`, error);
    }
  };

  const debouncedUpdate = useDebouncedCallback(async (id: string, text: string) => {
    try {
      await updateHighlight(resumeId, id, text);
    } catch (error) {
      console.error(`[HighlightList] Error updating highlight with id=${id}:`, error);
    }
  }, 500);

  const handleUpdate = (id: string, text: string) => {
    const current = highlights.find((h) => h.id === id);
    if (current?.text === text) return;

    const updatedHighlights = highlights.map((highlight) => (highlight.id === id ? { ...highlight, text } : highlight));
    setHighlights(updatedHighlights);
    debouncedUpdate(id, text);
  };

  const updateOrder = async (newHighlights: Highlight[]) => {
    try {
      await updateHighlightOrder(
        resumeId,
        newHighlights.map((highlight) => highlight.id),
      );
    } catch (error) {
      console.error(`[HighlightList] Error updating highlight order with:`, error);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }
    const oldIndex = highlights.findIndex((item) => item.id === (active.id as string));
    const newIndex = highlights.findIndex((item) => item.id === (over.id as string));
    const newHighlights = arrayMove(highlights, oldIndex, newIndex);

    // Optimistic Update
    setHighlights(newHighlights);

    // Background Update
    updateOrder(newHighlights);
  };

  return (
    <div>
      <DndContext id={dndId} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={highlights.map((highlight) => highlight.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {highlights.map((highlight) => (
              <SortableHighlightForm
                key={highlight.id}
                highlight={highlight}
                onChange={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="mt-4 flex items-center gap-x-2">
        <Button variant="outline" onClick={handleAdd}>
          <PlusIcon className="h-4 w-4" />
          追加
        </Button>
      </div>
    </div>
  );
}
