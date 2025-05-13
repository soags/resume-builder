"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PromotionFormData, promotionSchema } from "../schema";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";

type PromotionFormProps = {
  open: boolean;
  initialPromotion: PromotionFormData;
  onSave: (data: PromotionFormData) => void;
  onClose: () => void;
};

export function PromotionDialog({ open, initialPromotion, onSave, onClose }: PromotionFormProps) {
  const form = useForm({
    resolver: zodResolver(promotionSchema),
    defaultValues: initialPromotion,
    mode: "onChange",
  });

  useEffect(() => {
    form.reset(initialPromotion);
  }, [initialPromotion, form]);

  const {
    formState: { isValid, isSubmitting },
  } = form;

  const onSubmit = async (data: PromotionFormData) => {
    await onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:w-full sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>自己PRの編集</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              name="body"
              render={({ field }) => (
                <FormItem>
                  <Textarea
                    placeholder="本文を入力"
                    className="min-h-[150px] resize-y"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? "保存中…" : "保存"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
