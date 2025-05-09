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
};

export function FormYearMonthField<TFieldValues extends FieldValues>({
  label,
  control,
  yearName,
  monthName,
}: FormYearMonthFieldProps<TFieldValues>) {
  const {
    fieldState: { error: yearError },
  } = useController({ control, name: yearName });
  const {
    fieldState: { error: monthError },
  } = useController({ control, name: monthName });

  const error = !!yearError || !!monthError;
  const errorMessage = String(yearError?.message || monthError?.message || "");

  return (
    <div className="grid gap-2">
      {label && (
        <Label
          data-slot="form-label"
          data-error={!!error}
          className="data-[error=true]:text-destructive"
        >
          {label}
        </Label>
      )}
      <div className="flex items-center gap-x-2">
        <FormYearInput control={control} name={yearName} />
        <FormMonthInput control={control} name={monthName} />
      </div>
      <p data-slot="form-message" className="text-destructive text-sm">
        {errorMessage}
      </p>
    </div>
  );
}
