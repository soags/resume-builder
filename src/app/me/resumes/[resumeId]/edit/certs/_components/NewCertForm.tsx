"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { certSchema } from "../schema";
import { FormYearMonthField } from "@/components/FormYearMonthField";

export function NewCertForm() {
  const form = useForm({
    resolver: zodResolver(certSchema),
    defaultValues: {
      name: "",
      issuer: "",
      year: undefined,
      month: undefined,
    },
  });

  return (
    <Card className="p-0">
      <CardContent className="py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})}>
            <h2 className="mb-4 text-lg font-semibold">新しい資格の追加</h2>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      資格名 <span className="text-red-500">*</span>
                    </FormLabel>
                    <Input placeholder="資格名を入力" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="issuer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>発行団体名</FormLabel>
                    <Input placeholder="発行団体名を入力（任意）" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormYearMonthField
                label={
                  <>
                    取得年月 <span className="text-red-500">*</span>
                  </>
                }
                control={form.control}
                yearName="year"
                monthName="month"
              />

              <Button className="mt-2">
                <PlusCircle className="mr-2 h-4 w-4" />
                追加する
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
