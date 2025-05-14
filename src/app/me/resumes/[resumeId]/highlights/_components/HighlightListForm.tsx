"use client";

import { useId, useState } from "react";
import { SortableHighlightItem } from "./SortableHighlightItem";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { HighlightListFormValues, highlightListSchema } from "../schema";
import { Form } from "@/components/ui/form";
import { withClientFeedback } from "@/lib/withClientFeedback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { nanoid } from "nanoid";
import { Highlight } from "@/generated/prisma/client";
import { saveHighlights } from "../actions";
import { handleDragEnd } from "@/lib/dndKit";

type HighlightListFormProps = {
  resumeId: string;
  defaultHighlights: Highlight[];
};

export function HighlightListForm({ resumeId, defaultHighlights }: HighlightListFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<HighlightListFormValues>({
    resolver: zodResolver(highlightListSchema),
    defaultValues: {
      highlights: defaultHighlights.map((highlight) => ({
        ...highlight,
        isNew: false,
        isDeleted: false,
      })),
    },
    disabled: loading,
  });

  const { append } = useFieldArray({
    control: form.control,
    name: "highlights",
  });

  const dndId = useId();

  const handleSubmit = async (values: HighlightListFormValues) => {
    await withClientFeedback(
      async () => {
        const result = await saveHighlights(resumeId, values);
        if (result.ok) {
          const highlights = result.data.map((highlight) => ({
            ...highlight,
            isNew: false,
            isDeleted: false,
          }));
          form.reset({ highlights });
        }
        return result;
      },
      {
        onLoadingChange: setLoading,
      },
    );
  };

  return (
    <div className="container w-full max-w-3xl overflow-x-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ハイライト</CardTitle>
            </CardHeader>
            <CardContent>
              <DndContext
                id={dndId}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd({
                  items: () => form.watch("highlights"),
                  onMove: (items) => {
                    form.setValue("highlights", items);
                  },
                })}
              >
                <SortableContext
                  items={form.watch("highlights").map((field) => field.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {form.watch("highlights").map((field, index) => (
                      <SortableHighlightItem key={field.id} id={field.id} index={index} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
              <div className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ id: nanoid(), text: "", isNew: true, isDeleted: false })}
                >
                  <Plus />
                  ハイライトを追加
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <p className="text-sm text-yellow-600">
              {form.formState.isDirty && "※ 未保存の変更があります"}
            </p>
            <Button
              type="submit"
              disabled={loading}
              className="rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              保存
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
