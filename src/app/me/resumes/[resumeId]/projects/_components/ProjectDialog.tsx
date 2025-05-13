"use client";

import { useForm } from "react-hook-form";
import { ProjectFormData, projectSchema } from "../schema";
import { TechStackSelector } from "@/components/TechStack/TechStackSelector";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type ProjectDialogProps = {
  initialProject: ProjectFormData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: ProjectFormData) => void;
};

export function ProjectDialog({ initialProject, open, onOpenChange, onSave }: ProjectDialogProps) {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialProject,
  });

  useEffect(() => {
    form.reset(initialProject);
  }, [initialProject, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>プロジェクトを編集</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="grid gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>タイトル</FormLabel>
                  <FormControl>
                    <Input placeholder="タイトルを入力" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="URLを入力" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>概要</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="概要を入力"
                      className="min-h-[60px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stacks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>技術スタック</FormLabel>
                  <FormControl>
                    <TechStackSelector
                      value={field.value.map((item) => ({
                        value: item.name,
                        label: item.label,
                      }))}
                      onChange={(value) => {
                        field.onChange(
                          value.map((item) => ({
                            name: item.value,
                            label: item.label,
                          })),
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                キャンセル
              </Button>
              <Button type="submit">保存</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
