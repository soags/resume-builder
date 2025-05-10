"use client";

import {
  ControllerProps,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { FormMonthInput } from "./FormMonthInput";
import { FormYearInput } from "./FormYearInput";
import { Label } from "./ui/form";
import { ReactNode } from "react";

type FormYearMonthFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TYearName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TMonthName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  label?: ReactNode;
  control: ControllerProps<TFieldValues, TYearName>["control"];
  yearName: TYearName;
  monthName: TMonthName;
  onChange?: (value: {
    year: number | undefined;
    month: number | undefined;
  }) => void;
  onBlur?: () => void;
};

export function FormYearMonthField<TFieldValues extends FieldValues>({
  label,
  control,
  yearName,
  monthName,
  onChange,
  onBlur,
}: FormYearMonthFieldProps<TFieldValues>) {
  const {
    field: { value: year },
    fieldState: { error: yearError },
  } = useController({ control, name: yearName });
  const {
    field: { value: month },
    fieldState: { error: monthError },
  } = useController({ control, name: monthName });

  const error = !!yearError || !!monthError;
  const errorMessage = String(yearError?.message || monthError?.message || "");

  return (
    <div>
      {label && (
        <Label
          data-slot="form-label"
          data-error={!!error}
          className="data-[error=true]:text-destructive mb-2"
        >
          {label}
        </Label>
      )}
      <div className="flex items-center gap-x-2">
        <FormYearInput
          control={control}
          name={yearName}
          onChange={() => onChange?.({ year, month })}
          onBlur={onBlur}
        />
        <FormMonthInput
          control={control}
          name={monthName}
          onChange={() => onChange?.({ year, month })}
          onBlur={onBlur}
        />
      </div>
      <p data-slot="form-message" className="text-destructive text-sm">
        {errorMessage}
      </p>
    </div>
  );
}
