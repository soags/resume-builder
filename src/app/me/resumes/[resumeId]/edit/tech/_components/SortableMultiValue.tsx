"use client";

import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createContext, useContext } from "react";
import { components, MultiValueGenericProps } from "react-select";

const DragHandleContext = createContext<{
  attributes: DraggableAttributes | undefined;
  listeners: SyntheticListenerMap | undefined;
}>({
  attributes: undefined,
  listeners: undefined,
});

export function SortableMultiValueContainer(
  props: MultiValueGenericProps<unknown>,
) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.data.value,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "move",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <DragHandleContext.Provider value={{ attributes, listeners }}>
        <components.MultiValueContainer {...props} />
      </DragHandleContext.Provider>
    </div>
  );
}

export function SortableMultiValueLabel(
  props: MultiValueGenericProps<unknown>,
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
    },
  };

  return <components.MultiValueLabel {...newProps} />;
}
