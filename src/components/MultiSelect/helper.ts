import { cn } from "@/lib/utils";
import type {
  ClassNamesConfig,
  ClearIndicatorProps,
  ContainerProps,
  ControlProps,
  DropdownIndicatorProps,
  GroupHeadingProps,
  GroupProps,
  IndicatorsContainerProps,
  IndicatorSeparatorProps,
  InputProps,
  LoadingIndicatorProps,
  MenuListProps,
  MenuProps,
  MultiValueProps,
  NoticeProps,
  OptionProps,
  PlaceholderProps,
  SingleValueProps,
  ValueContainerProps,
  GroupBase,
  StylesConfig,
} from "react-select";
import type { MultiSelectOption } from "./types";

type ClassNames = ClassNamesConfig<MultiSelectOption, true, GroupBase<MultiSelectOption>>;

const controlStyles = {
  base: "flex !min-h-9 w-full rounded-md border border-input bg-transparent pl-3 py-1 pr-1 gap-1 text-sm shadow-sm transition-colors hover:cursor-pointer",
  focus: "outline-none ring-1 ring-ring",
  disabled: "cursor-not-allowed opacity-50",
};
const placeholderStyles = "text-sm text-muted-foreground";
const valueContainerStyles = "gap-1";
const multiValueStyles =
  "inline-flex items-center gap-2 rounded-md border border-transparent bg-gray-300 text-black px-2 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
const indicatorsContainerStyles = "gap-1";
const clearIndicatorStyles = "p-1 rounded-md";
const indicatorSeparatorStyles = "bg-border";
const dropdownIndicatorStyles = "p-1 rounded-md";
const menuStyles = "p-1 mt-1 border bg-popover shadow-md rounded-md text-popover-foreground";
const groupHeadingStyles = "py-2 px-1 text-secondary-foreground text-sm font-semibold";
const optionStyles = {
  base: "hover:cursor-pointer hover:bg-accent hover:text-accent-foreground px-2 py-1.5 rounded-sm !text-sm !cursor-default !select-none !outline-none font-sans",
  focus: "active:bg-accent/90 bg-accent text-accent-foreground",
  disabled: "pointer-events-none opacity-50",
  selected: "",
};
const noOptionsMessageStyles =
  "text-accent-foreground p-2 bg-accent border border-dashed border-border rounded-sm";
const loadingIndicatorStyles = "flex items-center justify-center h-4 w-4 opacity-50";
const loadingMessageStyles = "text-accent-foreground p-2 bg-accent";

export const createClassNames = (classNames: ClassNames): ClassNames => ({
  clearIndicator: (
    state: ClearIndicatorProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>,
  ) => cn(clearIndicatorStyles, classNames?.clearIndicator?.(state)),

  container: (state: ContainerProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>) =>
    cn(classNames?.container?.(state)),

  control: (state: ControlProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>) =>
    cn(
      controlStyles.base,
      state.isDisabled && controlStyles.disabled,
      state.isFocused && controlStyles.focus,
      classNames?.control?.(state),
    ),

  dropdownIndicator: (
    state: DropdownIndicatorProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>,
  ) => cn(dropdownIndicatorStyles, classNames?.dropdownIndicator?.(state)),

  group: (state: GroupProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>) =>
    cn(classNames?.group?.(state)),

  groupHeading: (state: GroupHeadingProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>) =>
    cn(groupHeadingStyles, classNames?.groupHeading?.(state)),

  indicatorsContainer: (
    state: IndicatorsContainerProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>,
  ) => cn(indicatorsContainerStyles, classNames?.indicatorsContainer?.(state)),

  indicatorSeparator: (
    state: IndicatorSeparatorProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>,
  ) => cn(indicatorSeparatorStyles, classNames?.indicatorSeparator?.(state)),

  input: (state: InputProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>) =>
    cn(classNames?.input?.(state)),

  loadingIndicator: (
    state: LoadingIndicatorProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>,
  ) => cn(loadingIndicatorStyles, classNames?.loadingIndicator?.(state)),

  loadingMessage: (state: NoticeProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>) =>
    cn(loadingMessageStyles, classNames?.loadingMessage?.(state)),

  menu: (state: MenuProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>) =>
    cn(menuStyles, classNames?.menu?.(state)),

  menuList: (state: MenuListProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>) =>
    cn(classNames?.menuList?.(state)),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  menuPortal: () => cn(classNames?.menuPortal?.({} as any)),

  multiValue: (state: MultiValueProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>) =>
    cn(multiValueStyles, classNames?.multiValue?.(state)),

  multiValueLabel: (
    state: MultiValueProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>,
  ) => cn(classNames?.multiValueLabel?.(state)),

  multiValueRemove: (
    state: MultiValueProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>,
  ) => cn(classNames?.multiValueRemove?.(state)),

  noOptionsMessage: (state: NoticeProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>) =>
    cn(noOptionsMessageStyles, classNames?.noOptionsMessage?.(state)),

  option: (state: OptionProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>) =>
    cn(
      optionStyles.base,
      state.isFocused && optionStyles.focus,
      state.isDisabled && optionStyles.disabled,
      state.isSelected && optionStyles.selected,
      classNames?.option?.(state),
    ),

  placeholder: (state: PlaceholderProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>) =>
    cn(placeholderStyles, classNames?.placeholder?.(state)),

  singleValue: (state: SingleValueProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>) =>
    cn(classNames?.singleValue?.(state)),

  valueContainer: (
    state: ValueContainerProps<MultiSelectOption, true, GroupBase<MultiSelectOption>>,
  ) => cn(valueContainerStyles, classNames?.valueContainer?.(state)),
});

export const defaultClassNames = createClassNames({});

export const defaultStyles: StylesConfig<MultiSelectOption, true, GroupBase<MultiSelectOption>> = {
  input: (base) => ({
    ...base,
    "input:focus": {
      boxShadow: "none",
    },
  }),
  multiValueLabel: (base) => ({
    ...base,
    whiteSpace: "normal",
    overflow: "visible",
  }),
  control: (base) => ({
    ...base,
    transition: "none",
    // minHeight: '2.25rem', // we used !min-h-9 instead
  }),
  menuList: (base) => ({
    ...base,
    "::-webkit-scrollbar": {
      background: "transparent",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      background: "hsl(var(--border))",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "transparent",
    },
  }),
};
