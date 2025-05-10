"use client";

import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { NumberSelect } from "./NumberSelect";
import { useMemo } from "react";

type FormYearInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  onChange?: (value: number | undefined) => void;
  onBlur?: () => void;
};

export function FormYearInput<TFieldValues extends FieldValues>({
  onChange,
  onBlur,
  ...props
}: FormYearInputProps<TFieldValues>) {
  const items = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => currentYear - i).map(
      (year) => ({ value: year, label: year.toString() }),
    );
  }, []);

  return (
    <div className="flex items-center gap-x-2">
      <Controller
        {...props}
        render={({
          field: { value, onChange: onChangeField, onBlur: onBlurField },
        }) => (
          <NumberSelect
            value={value}
            items={items}
            placeholder="西暦を選択"
            buttonClassName="w-auto"
            popoverClassName="w-[200px]"
            onChange={(year) => {
              onChange?.(year);
              onChangeField(year);
              onBlur?.();
              onBlurField();
            }}
          />
        )}
      />
      <span className="text-sm">年</span>
    </div>
  );
}
