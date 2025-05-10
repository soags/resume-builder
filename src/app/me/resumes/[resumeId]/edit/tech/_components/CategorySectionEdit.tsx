"use client";

import { useEffect, useId, useState } from "react";
import dynamic from "next/dynamic";
import { getSuggestions, Option, toOption, toOptions } from "../utils";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableMultiValueContainer,
  SortableMultiValueLabel,
} from "./SortableMultiValue";

const CreatableSelect = dynamic(() => import("react-select/creatable"), {
  ssr: false,
});

type CategorySectionProps = {
  initialStacks: string[];
};

export default function CategorySectionEdit({
  initialStacks,
}: CategorySectionProps) {
  const [value, setValue] = useState<Option[]>(toOptions(initialStacks));

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

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <DndContext
      id={dndId}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
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
  );
}
