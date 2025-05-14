"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Resume } from "@/generated/prisma/client";
import { withClientFeedback } from "@/lib/withClientFeedback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SummaryFormData, summarySchema } from "../schema";
import { updateSummary } from "../actions";
import { Textarea } from "@/components/ui/textarea";

type SummaryFormProps = {
  resume: Resume;
};

export function SummaryForm({ resume }: SummaryFormProps) {
  const form = useForm({
    resolver: zodResolver(summarySchema),
    defaultValues: resume,
  });

  const summary = form.watch("summary");
  const length = summary.length;

  const handleSubmit = async (data: SummaryFormData) => {
    await withClientFeedback(async () => {
      const result = await updateSummary(resume.id, data);
      if (result.ok) {
        form.reset(result.data);
      }
      return result;
    });
  };

  return (
    <div className="container w-full max-w-4xl overflow-x-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* 職務要約 */}
          <Card>
            <CardHeader>
              <CardTitle>職務要約</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="summary"
                render={({ field: { ...field } }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="職務要約を入力"
                        className="min-h-[150px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="px-2 py-2">
                <p className="text-sm text-gray-500">{length}字 / 200~400字</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <p className="text-sm text-yellow-600">
              {form.formState.isDirty && "※ 未保存の変更があります"}
            </p>
            <Button
              type="submit"
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
