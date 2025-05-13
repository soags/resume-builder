import {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  GroupBase,
  MultiValueRemoveProps,
  OptionProps,
} from "react-select";
import { type MultiSelectOption } from "./types";
import type { CreatableProps } from "react-select/creatable";
import { Check, ChevronDown, X } from "lucide-react";
import { defaultClassNames, defaultStyles } from "./helper";
import dynamic from "next/dynamic";

const CreatableSelect = dynamic(() => import("react-select/creatable"), {
  ssr: false,
}) as React.ComponentType<CreatableProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>>;

export type MultiSelectProps = Omit<
  CreatableProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>,
  "isMulti" | "unstyled"
>;

export function MultiSelect({ components, classNames, styles, ...props }: MultiSelectProps) {
  return (
    <CreatableSelect
      isMulti
      unstyled
      classNames={classNames ?? defaultClassNames}
      styles={styles ?? defaultStyles}
      components={{ DropdownIndicator, ClearIndicator, MultiValueRemove, Option, ...components }}
      {...props}
    />
  );
}

function DropdownIndicator(
  props: DropdownIndicatorProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>,
) {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown className={"h-4 w-4 opacity-50"} />
    </components.DropdownIndicator>
  );
}

function ClearIndicator(
  props: ClearIndicatorProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>,
) {
  return (
    <components.ClearIndicator {...props}>
      <X className={"h-3.5 w-3.5 opacity-50"} />
    </components.ClearIndicator>
  );
}

function MultiValueRemove(
  props: MultiValueRemoveProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>,
) {
  return (
    <components.MultiValueRemove {...props}>
      <X className={"h-3 w-3 opacity-50"} />
    </components.MultiValueRemove>
  );
}

function Option(props: OptionProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>) {
  return (
    <components.Option {...props}>
      <div className="flex items-center justify-between">
        <div>{props.data.label}</div>
        {props.isSelected && <Check />}
      </div>
    </components.Option>
  );
}
