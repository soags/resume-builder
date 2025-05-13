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
import { withClientLogging } from "@/lib/withClientLogging";

export function HighlightList({ resumeId, initial }: { resumeId: string; initial: Highlight[] }) {
  const [highlights, setHighlights] = useState(initial);
  const dndId = useId();

  useEffect(() => {
    const fetchHighlights = async () => {
      await withClientLogging(
        async () => {
          const data = await getHighlights(resumeId);
          if (data) {
            setHighlights(data);
          }
        },
        {
          context: "HighlightList.fetch",
          errorMessage: "ハイライトの取得に失敗しました",
        },
      );
    };
    fetchHighlights();
  }, [resumeId]);

  const handleAdd = async () => {
    await withClientLogging(
      async () => {
        await addHighlight(resumeId);
        const data = await getHighlights(resumeId);
        if (data) {
          setHighlights(data);
        }
      },
      {
        context: "HighlightList.add",
        errorMessage: "ハイライトの追加に失敗しました",
      },
    );
  };

  const handleDelete = async (id: string) => {
    await withClientLogging(
      async () => {
        await deleteHighlight(resumeId, id);
        const data = await getHighlights(resumeId);
        if (data) {
          setHighlights(data);
        }
      },
      {
        context: "HighlightList.delete",
        errorMessage: "ハイライトの削除に失敗しました",
      },
    );
  };

  const debouncedUpdate = useDebouncedCallback(async (id: string, text: string) => {
    await withClientLogging(
      async () => {
        await updateHighlight(resumeId, id, text);
      },
      {
        context: "HighlightList.update",
        errorMessage: "ハイライトの更新に失敗しました",
      },
    );
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

  const updateOrder = async (newHighlights: Highlight[]) => {
    await withClientLogging(
      async () => {
        await updateHighlightOrder(
          resumeId,
          newHighlights.map((highlight) => highlight.id),
        );
      },
      {
        context: "HighlightList.updateOrder",
        errorMessage: "ハイライトの並び順の更新に失敗しました",
      },
    );
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
