"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

export type NumberSelectItem = {
  value: number;
  label: string;
};

export type NumberSelectProps = {
  value: number | undefined;
  items: NumberSelectItem[];
  placeholder?: string;
  allowDeselect?: boolean;
  buttonClassName?: string;
  popoverClassName?: string;
  onChange: (value: number | undefined) => void;
};

export function NumberSelect({
  value,
  items,
  placeholder = "選択してください",
  allowDeselect = true,
  buttonClassName,
  popoverClassName,
  onChange,
}: NumberSelectProps) {
  const [open, setOpen] = useState(false);

  const displayLabel = items.find((item) => item.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="数値を選択"
          className={cn("w-[200px] justify-between", buttonClassName)}
        >
          {displayLabel ?? placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-[200px] p-0", popoverClassName)}>
        <Command>
          <CommandInput placeholder="検索…" />
          <CommandList>
            <CommandEmpty>該当項目がありません</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={`${item.value} ${item.label}`}
                  onSelect={() => {
                    const isSame = item.value === value;
                    onChange(isSame && allowDeselect ? undefined : item.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
