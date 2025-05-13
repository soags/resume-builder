"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewResumeFormData, newResumeSchema } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEffect } from "react";
import { nanoid } from "nanoid";

interface NewResumeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewResumeFormData) => void;
}

export function NewResumeDialog({ isOpen, onClose, onSubmit }: NewResumeDialogProps) {
  const form = useForm({
    resolver: zodResolver(newResumeSchema),
    defaultValues: {
      title: "",
      slug: nanoid(10),
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>新しい職務経歴書を作成</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="pt-3">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>タイトル</FormLabel>
                    <Input {...field} placeholder="職務経歴書のタイトルを入力" />
                    <FormDescription>管理用のタイトルです。職務経歴書には表示されません。</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>スラッグ</FormLabel>
                    <Input {...field} placeholder="職務経歴書のスラッグを入力" />
                    <FormDescription>公開用URL(/r/:userSlug/:resumeSlug/)に使用するSlugです。</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={onClose}>
                キャンセル
              </Button>
              <Button type="submit">職務経歴書を作成</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
