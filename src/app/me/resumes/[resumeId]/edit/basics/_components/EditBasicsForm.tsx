"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui/form";
import { resumeSchema } from "@/features/resumes/schema/resumeSchema";
import { Resume } from "@/generated/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof resumeSchema>;

export function EditBasicsForm({ resume }: { resume: Resume }) {
  const form = useForm<FormData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: resume,
  });

  const onSubmit = async (data: FormData) => {
    const response = await fetch(`/me/resumes/${resume.id}/edit/basics/api`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      alert("保存に失敗しました。");
      return;
    }
    alert("保存しました。");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-3xl rounded-lg border border-slate-300 p-8"
      >
        <header className="mb-8">
          <h2 className="text-2xl font-bold">基本情報</h2>
        </header>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>職務経歴書タイトル</FormLabel>
                <FormControl>
                  <Input placeholder="職務経歴書" {...field} />
                </FormControl>
                <FormDescription>
                  ※ 管理用のタイトルです。職務経歴書には表示されません。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>名前</FormLabel>
                <FormControl>
                  <Input placeholder="曽我 周平" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>職種</FormLabel>
                <FormControl>
                  <Input placeholder="フルスタックエンジニア" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="qiita"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qiita URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://qiita.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zenn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zenn URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://zenn.dev/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="speakerDeck"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Speaker Deck URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://speakerdeck.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slideShare"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SlideShare URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://www.slideshare.net/..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-6 flex gap-8">
            <Button
              type="submit"
              className="flex-1 bg-sky-800 hover:bg-sky-950"
            >
              保存
            </Button>
            <Button className="flex-1" variant="outline" type="reset">
              元に戻す
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
