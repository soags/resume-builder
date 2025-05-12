import { MultiSelectOption } from "@/components/MultiSelect";

// TODO: 別ファイル or DBから取得する
export const dict: Record<string, string> = {
  react: "React",
  vue: "Vue.js",
  typescript: "TypeScript",
  javascript: "JavaScript",
  next: "Next.js",
};

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
