import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { MultiSelectOption, SortableMultiSelect } from "../MultiSelect";
import { getSuggestions, toOption } from "./utils";
import { useId } from "react";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

type TechStackSelectorProps = {
  value: MultiSelectOption[];
  onChange: (value: MultiSelectOption[]) => void;
};

export function TechStackSelector({ value, onChange }: TechStackSelectorProps) {
  const dndId = useId();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = value.findIndex((i) => i.value === active.id);
      const newIndex = value.findIndex((i) => i.value === over?.id);
      const newValue = arrayMove(value, oldIndex, newIndex);
      onChange(newValue);
    }
  };

  return (
    <DndContext id={dndId} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={value.map((v) => v.value)}>
        <SortableMultiSelect
          placeholder="技術スタックを追加"
          value={value}
          options={getSuggestions()}
          getNewOptionData={(input) => toOption(input)}
          onChange={(selected) => onChange(selected as MultiSelectOption[])}
        />
      </SortableContext>
    </DndContext>
  );
}
