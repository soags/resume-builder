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
import { Input } from "@/components/ui/input";
import { ResumeFormData, resumeSchema } from "../schema";
import { checkSlugDuplicate, updateResume } from "../actions";
import { withClientFeedback } from "@/lib/withClientFeedback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";

type ResumeFormProps = {
  userId: string;
  resume: Resume;
};

export function ResumeForm({ userId, resume }: ResumeFormProps) {
  const form = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: resume,
  });

  const slugValue = form.watch("slug");
  const [debouncedSlug] = useDebounce(slugValue, 500);

  // slugの重複チェック
  useEffect(() => {
    if (!debouncedSlug) return;

    const check = async () => {
      const result = await checkSlugDuplicate(userId, debouncedSlug, resume.id);
      if (result.ok && result.data) {
        form.setError("slug", {
          type: "manual",
          message: "このSlugはすでに使用されています",
        });
      } else {
        form.clearErrors("slug");
      }
    };

    check();
  }, [debouncedSlug, form, resume.id, userId]);

  const handleSubmit = async (data: ResumeFormData) => {
    await withClientFeedback(async () => {
      const result = await updateResume(resume.id, data, userId);
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
          {/* 基本情報 */}
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field: { ...field } }) => (
                      <FormItem>
                        <FormLabel required>レジュメタイトル</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>管理用のタイトル。公開されません。</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field: { ...field } }) => (
                      <FormItem>
                        <FormLabel required>公開用Slug</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          英数字とハイフンのみ。公開URLに使用されます。
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field: { ...field } }) => (
                      <FormItem>
                        <FormLabel required>名前</FormLabel>
                        <FormControl>
                          <Input placeholder="曽我 周平" {...field} />
                        </FormControl>
                        <FormDescription>
                          あなたのフルネーム。レジュメに記載されます。
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="label"
                    render={({ field: { ...field } }) => (
                      <FormItem>
                        <FormLabel>職種</FormLabel>
                        <FormControl>
                          <Input placeholder="フルスタックエンジニア" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* リンクカード */}
          <Card>
            <CardHeader>
              <CardTitle>リンク</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                {
                  name: "github",
                  label: "GitHub URL",
                  placeholder: "https://github.com/ユーザー名",
                },
                { name: "qiita", label: "Qiita URL", placeholder: "https://qiita.com/ユーザー名" },
                { name: "zenn", label: "Zenn URL", placeholder: "https://zenn.dev/ユーザー名" },
                {
                  name: "speakerDeck",
                  label: "Speaker Deck URL",
                  placeholder: "https://speakerdeck.com/ユーザー名",
                },
                {
                  name: "slideShare",
                  label: "SlideShare URL",
                  placeholder: "https://www.slideshare.net/ユーザー名",
                },
              ].map(({ name, label, placeholder }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof ResumeFormData}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input placeholder={placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>
          </Card>

          <Separator />
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
