"use client";

import { useEffect, useId, useState } from "react";
import {
  getHighlights,
  addHighlight,
  deleteHighlight,
  updateHighlight,
  updateHighlightOrder,
} from "../actions";
import { Highlight } from "@/generated/prisma/client";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDebouncedCallback } from "use-debounce";
import { SortableHighlightForm } from "./SortableHighlightForm";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { withClientFeedback } from "@/lib/withClientFeedback";

export function HighlightList({ resumeId, initial }: { resumeId: string; initial: Highlight[] }) {
  const [highlights, setHighlights] = useState(initial);
  const dndId = useId();

  useEffect(() => {
    const fetchHighlights = async () => {
      const result = await withClientFeedback(async () => await getHighlights(resumeId));
      if (result.ok && result.data) {
        setHighlights(result.data);
      }
    };
    fetchHighlights();
  }, [resumeId]);

  const handleAdd = async () => {
    await withClientFeedback(async () => {
      const addResult = await addHighlight(resumeId);
      if (!addResult.ok) {
        return addResult;
      }
      const getResult = await getHighlights(resumeId);
      if (getResult.ok && getResult.data) {
        setHighlights(getResult.data);
      }
      return getResult;
    });
  };

  const handleDelete = async (id: string) => {
    await withClientFeedback(async () => {
      const deleteResult = await deleteHighlight(resumeId, id);
      if (!deleteResult.ok) {
        return deleteResult;
      }
      const getResult = await getHighlights(resumeId);
      if (getResult.ok && getResult.data) {
        setHighlights(getResult.data);
      }
      return getResult;
    });
  };

  const debouncedUpdate = useDebouncedCallback(async (id: string, text: string) => {
    await withClientFeedback(async () => await updateHighlight(resumeId, id, text));
  }, 500);

  const handleUpdate = (id: string, text: string) => {
    const current = highlights.find((h) => h.id === id);
    if (current?.text === text) return;

    const updatedHighlights = highlights.map((highlight) =>
      highlight.id === id ? { ...highlight, text } : highlight,
    );
    setHighlights(updatedHighlights);
    debouncedUpdate(id, text);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }
    const oldIndex = highlights.findIndex((item) => item.id === (active.id as string));
    const newIndex = highlights.findIndex((item) => item.id === (over.id as string));
    const newHighlights = arrayMove(highlights, oldIndex, newIndex);

    setHighlights(newHighlights);

    await withClientFeedback(
      async () =>
        await updateHighlightOrder(
          resumeId,
          newHighlights.map((highlight) => highlight.id),
        ),
    );
  };

  return (
    <div>
      <DndContext id={dndId} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={highlights.map((highlight) => highlight.id)}
          strategy={verticalListSortingStrategy}
        >
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
