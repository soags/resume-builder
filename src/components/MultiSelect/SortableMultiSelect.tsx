"use client";

import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createContext, useContext } from "react";
import { components, GroupBase, MultiValueGenericProps } from "react-select";
import { MultiSelect, MultiSelectProps } from "./MultiSelect";
import { MultiSelectOption } from "./types";

type SortableMultiSelectProps = Omit<MultiSelectProps, "components">;

export function SortableMultiSelect(props: SortableMultiSelectProps) {
  return (
    <MultiSelect
      {...props}
      components={{
        MultiValueContainer,
        MultiValueLabel,
      }}
    />
  );
}

const DragHandleContext = createContext<{
  attributes: DraggableAttributes | undefined;
  listeners: SyntheticListenerMap | undefined;
}>({
  attributes: undefined,
  listeners: undefined,
});

function MultiValueContainer(
  props: MultiValueGenericProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>,
) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.data.value,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="cursor-grab">
      <DragHandleContext.Provider value={{ attributes, listeners }}>
        <components.MultiValueContainer {...props} />
      </DragHandleContext.Provider>
    </div>
  );
}

function MultiValueLabel(
  props: MultiValueGenericProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>,
) {
  const { attributes, listeners } = useContext(DragHandleContext);

  const dragHandleProps = {
    ...attributes,
    ...listeners,
  };

  const newProps = {
    ...props,
    innerProps: {
      ...props.innerProps,
      ...dragHandleProps,
      "aria-label": "ドラッグして並び替え",
    },
  };

  return <components.MultiValueLabel {...newProps} />;
}
