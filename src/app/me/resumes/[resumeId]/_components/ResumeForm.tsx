"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Resume } from "@/generated/prisma/client";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { ResumeFormData, resumeSchema } from "../schema";
import { updateResume } from "../actions";
import { logger } from "@/lib/logger";

type ResumeFormProps = {
  resume: Resume;
};

export function ResumeForm({ resume }: ResumeFormProps) {
  const form = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: resume,
  });

  const handleBlur = (onBlur: () => void) => {
    return () => {
      onBlur();
      autoSubmit();
    };
  };

  const handleSubmit = async (data: ResumeFormData) => {
    try {
      await updateResume(resume.id, data);
    } catch (error) {
      logger.handle(error, "ResumeForm");
    }
  };

  const autoSubmit = useDebouncedCallback(() => {
    form.handleSubmit(handleSubmit)();
  }, 500);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field: { onBlur, ...field } }) => (
            <FormItem>
              <FormLabel>職務経歴書タイトル</FormLabel>
              <FormControl>
                <Input onBlur={handleBlur(onBlur)} {...field} />
              </FormControl>
              <FormDescription>
                管理用のタイトルです。職務経歴書には表示されません。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field: { onBlur, ...field } }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input onBlur={handleBlur(onBlur)} {...field} />
              </FormControl>
              <FormDescription>
                公開用URL(/r/:userSlug/:resumeSlug/)に使用するSlugです。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field: { onBlur, ...field } }) => (
            <FormItem>
              <FormLabel>名前</FormLabel>
              <FormControl>
                <Input placeholder="曽我 周平" onBlur={handleBlur(onBlur)} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="label"
          render={({ field: { onBlur, ...field } }) => (
            <FormItem>
              <FormLabel>職種</FormLabel>
              <FormControl>
                <Input
                  placeholder="フルスタックエンジニア"
                  onBlur={handleBlur(onBlur)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="github"
          render={({ field: { onBlur, ...field } }) => (
            <FormItem>
              <FormLabel>GitHub URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://github.com/..."
                  onBlur={handleBlur(onBlur)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="qiita"
          render={({ field: { onBlur, ...field } }) => (
            <FormItem>
              <FormLabel>Qiita URL</FormLabel>
              <FormControl>
                <Input placeholder="https://qiita.com/..." onBlur={handleBlur(onBlur)} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zenn"
          render={({ field: { onBlur, ...field } }) => (
            <FormItem>
              <FormLabel>Zenn URL</FormLabel>
              <FormControl>
                <Input placeholder="https://zenn.dev/..." onBlur={handleBlur(onBlur)} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="speakerDeck"
          render={({ field: { onBlur, ...field } }) => (
            <FormItem>
              <FormLabel>Speaker Deck URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://speakerdeck.com/..."
                  onBlur={handleBlur(onBlur)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slideShare"
          render={({ field: { onBlur, ...field } }) => (
            <FormItem>
              <FormLabel>SlideShare URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.slideshare.net/..."
                  onBlur={handleBlur(onBlur)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
