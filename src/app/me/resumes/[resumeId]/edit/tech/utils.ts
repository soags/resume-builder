export type Option = {
  label: string;
  value: string;
};

export const dict: Record<string, string> = {
  react: "React",
  vue: "Vue.js",
  typescript: "TypeScript",
  javascript: "JavaScript",
  next: "Next.js",
};

export function normalize(input: string) {
  return input.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();
}

export function toOption(value: string): Option {
  const normalized = normalize(value);
  return {
    value: normalized,
    label: dict[normalized] || value,
  };
}

export function getSuggestions(): Option[] {
  return Object.keys(dict).map(toOption);
}
