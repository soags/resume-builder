"use client";

import { useEffect, useState } from "react";
import { getHighlights, addHighlight, deleteHighlight } from "../actions";
import { Highlight } from "@/generated/prisma/client";
import { GripVerticalIcon, Trash2Icon } from "lucide-react";
import { Input } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

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

  return (
    <div>
      <div className="space-y-2">
        {highlights.map((highlight) => (
          <div key={highlight.id} className="flex items-center gap-x-2">
            <div className="hover:cursor-grab">
              <GripVerticalIcon className="h-5 w-5" />
            </div>
            <Input
              className="focus-visible:border-border flex-1 focus-visible:ring-0"
              defaultValue={highlight.text}
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
      <div className="flex items-center gap-x-2">
        <Button variant="outline" onClick={handleAdd}>
          追加
        </Button>
        <input type="hidden" name="resumeId" value={resumeId} />
      </div>
    </div>
  );
}
