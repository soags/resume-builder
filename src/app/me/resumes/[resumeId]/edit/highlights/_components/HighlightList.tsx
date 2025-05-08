"use client";

import { useEffect, useState } from "react";
import {
  getHighlights,
  addHighlight,
  deleteHighlight,
  updateHighlight,
} from "../actions";
import { Highlight } from "@/generated/prisma/client";
import { GripVerticalIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Input } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useDebouncedCallback } from "use-debounce";

export function HighlightList({
  resumeId,
  initial,
}: {
  resumeId: string;
  initial: Highlight[];
}) {
  const [highlights, setHighlights] = useState(initial);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const data = await getHighlights(resumeId);
        setHighlights(data);
      } catch (error) {
        console.error(
          `[HighlightList] Error fetching highlights for resumeId=${resumeId}:`,
          error,
        );
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
      console.error(
        `[HighlightList] Error adding highlight for resumeId=${resumeId}:`,
        error,
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteHighlight(id);
      const data = await getHighlights(resumeId);
      setHighlights(data);
    } catch (error) {
      console.error(
        `[HighlightList] Error deleting highlight with id=${id}:`,
        error,
      );
    }
  };

  const debouncedUpdate = useDebouncedCallback(
    async (id: string, text: string) => {
      try {
        console.log("debouncedUpdate", id, text);
        await updateHighlight(id, text);
      } catch (error) {
        console.error(
          `[HighlightList] Error updating highlight with id=${id}:`,
          error,
        );
      }
    },
    500,
  );

  const handleUpdate = (id: string, text: string) => {
    const current = highlights.find((h) => h.id === id);
    if (current?.text === text) return;

    const updatedHighlights = highlights.map((highlight) =>
      highlight.id === id ? { ...highlight, text } : highlight,
    );
    setHighlights(updatedHighlights);
    debouncedUpdate(id, text);
  };

  return (
    <div>
      <div className="space-y-2">
        {highlights.map((highlight) => (
          <div key={highlight.id} className="flex items-center gap-x-2">
            {/* ドラッグハンドル */}
            <div className="hover:cursor-grab">
              <GripVerticalIcon className="h-5 w-5" />
            </div>

            {/* テキスト */}
            <Input
              className="focus-visible:border-border flex-1 focus-visible:ring-0"
              value={highlight.text ?? ""}
              onChange={(e) => {
                handleUpdate(highlight.id, e.target.value);
              }}
            />

            {/* 削除ボタン */}
            <Button
              type="submit"
              variant="link"
              size="icon"
              className="text-destructive"
              onClick={() => handleDelete(highlight.id)}
            >
              <Trash2Icon />
            </Button>
          </div>
        ))}
      </div>

      {/* 追加ボタン */}
      <div className="mt-4 flex items-center gap-x-2">
        <Button variant="outline" onClick={handleAdd}>
          <PlusIcon className="h-4 w-4" />
          追加
        </Button>
      </div>
    </div>
  );
}
