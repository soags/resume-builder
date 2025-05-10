"use client";

import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { NumberSelect } from "./NumberSelect";
import { useMemo } from "react";

type FormMonthInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  onChange?: (value: number | undefined) => void;
  onBlur?: () => void;
};

export function FormMonthInput<TFieldValues extends FieldValues>({
  onChange,
  onBlur,
  ...props
}: FormMonthInputProps<TFieldValues>) {
  const items = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => i + 1).map((month) => ({
      value: month,
      label: month.toString(),
    }));
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
            placeholder="月を選択"
            buttonClassName="w-auto"
            popoverClassName="w-[200px]"
            onChange={(month) => {
              onChange?.(month);
              onChangeField(month);
              onBlur?.();
              onBlurField();
            }}
          />
        )}
      />
      <span className="text-sm">月</span>
    </div>
  );
}
