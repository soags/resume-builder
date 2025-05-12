import { MultiSelectOption } from "@/components/MultiSelect";
import { dict } from "./dict";

export function normalize(input: string) {
  return input
    .trim()
    .replace(/\.js$/, "")
    .replace(/\.net$/, "dotnet")
    .replace(/[^\p{L}\p{N}]/gu, "")
    .toLowerCase();
}

export function collation(options: MultiSelectOption): MultiSelectOption {
  const normalized = normalize(options.value);
  return {
    value: normalized,
    label: dict[normalized] || options.value,
  };
}

export function toOption(value: string): MultiSelectOption {
  const normalized = normalize(value);
  return {
    value: normalized,
    label: dict[normalized] || value,
  };
}

export function getSuggestions() {
  return Object.keys(dict).map(toOption);
}
