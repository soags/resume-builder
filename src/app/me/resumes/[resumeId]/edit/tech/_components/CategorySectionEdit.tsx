"use client";

import { useId, useState } from "react";
import dynamic from "next/dynamic";
import { collation, getSuggestions, Option, toOption } from "../utils";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableMultiValueContainer, SortableMultiValueLabel } from "./SortableMultiValue";
import { Button } from "@/components/ui/button";
import { TechStack } from "@/generated/prisma/client";
import { TechStackFormData } from "../schema";

const CreatableSelect = dynamic(() => import("react-select/creatable"), {
  ssr: false,
});

type CategorySectionProps = {
  initialStacks: TechStack[];
  onSave: (data: TechStackFormData[]) => void;
  onCancel: () => void;
};

export function CategorySectionEdit({ initialStacks, onSave, onCancel }: CategorySectionProps) {
  const [value, setValue] = useState<Option[]>(
    initialStacks.map((stack) =>
      collation({
        value: stack.name,
        label: stack.label,
      }),
    ),
  );

  const dndId = useId();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = value.findIndex((i) => i.value === active.id);
      const newIndex = value.findIndex((i) => i.value === over?.id);
      const newValue = arrayMove(value, oldIndex, newIndex);
      setValue(newValue);
    }
  };

  const handleSave = () => {
    onSave(
      value.map((v) => ({
        name: v.value,
        label: v.label,
      })),
    );
  };

  return (
    <div className="grid gap-4">
      <DndContext id={dndId} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={value.map((v) => v.value)}>
          <CreatableSelect
            isMulti
            value={value}
            options={getSuggestions()}
            getNewOptionData={(input) => toOption(input)}
            onChange={(selected) => {
              setValue(selected as Option[]);
            }}
            placeholder="技術スタックを追加"
            components={{
              MultiValueContainer: SortableMultiValueContainer,
              MultiValueLabel: SortableMultiValueLabel,
            }}
          />
        </SortableContext>
      </DndContext>
      <div className="flex gap-2">
        <Button variant="outline" className="rounded-full" onClick={() => onCancel()}>
          キャンセル
        </Button>
        <Button className="rounded-full" onClick={handleSave}>
          確定する
        </Button>
      </div>
    </div>
  );
}
