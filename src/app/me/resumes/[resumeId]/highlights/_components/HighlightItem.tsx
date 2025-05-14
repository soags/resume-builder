"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GripVertical, Trash2, Undo2 } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn, fieldPath } from "@/lib/utils";
import { HighlightListFormValues } from "../schema";

export type HighlightItemProps = {
  index: number;
  dragHandleProps?: ComponentPropsWithoutRef<"div">;
};

export function HighlightItem({ index, dragHandleProps }: HighlightItemProps) {
  const { control, getValues, setValue } = useFormContext<HighlightListFormValues>();
  const isDeleted = useWatch({ control, name: `highlights.${index}.isDeleted` });

  return (
    <FormField
      control={control}
      name={`highlights.${index}.text`}
      render={({ field, fieldState: { invalid } }) => (
        <FormItem className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            {/* ドラッグハンドル */}
            <div {...dragHandleProps} className="hover:cursor-grab">
              <GripVertical className="h-5 w-5" />
            </div>

            {/* 入力欄 */}
            <FormControl>
              <Input
                {...field}
                className={cn(isDeleted && "text-destructive line-through", "disabled:opacity-100")}
                disabled={isDeleted}
              />
            </FormControl>

            {/* 削除ボタン */}
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className={isDeleted ? "text-muted-foreground" : "text-destructive"}
              onClick={() => {
                const path = fieldPath<HighlightListFormValues, `highlights.${number}.isDeleted`>(
                  `highlights.${index}.isDeleted`,
                );
                const current = getValues(path);
                setValue(path, !current);
              }}
            >
              {isDeleted ? <Undo2 /> : <Trash2 />}
            </Button>
          </div>
          <div className="flex items-center gap-x-2">
            {/* 幅調整スペーサー */}
            <div className={invalid ? "invisible" : "hidden"}>
              <GripVertical className="h-5 w-5" />
            </div>

            {/* エラーメッセージ */}
            <div className="w-full">
              <FormMessage />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
}
