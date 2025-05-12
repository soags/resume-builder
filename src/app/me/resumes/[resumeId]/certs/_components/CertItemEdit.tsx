import { zodResolver } from "@hookform/resolvers/zod";
import { Award, Building2, Calendar, Link } from "lucide-react";
import { useForm } from "react-hook-form";
import { CertFormData, certSchema } from "../schema";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormYearMonthField } from "@/components/FormYearMonthField";
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

type CertItemEditProps = {
  defaultValues: CertFormData;
  onSubmit: (data: CertFormData) => void;
  onFinishEditing: () => void;
};

export function CertItemEdit({ defaultValues, onSubmit, onFinishEditing }: CertItemEditProps) {
  const ref = useRef<HTMLFormElement>(null);
  const form = useForm({
    resolver: zodResolver(certSchema),
    defaultValues,
  });

  const autoSubmit = () => {
    form.handleSubmit(onSubmit)();
  };

  const handleBlur = (onBlur: () => void) => {
    return () => {
      onBlur();
      autoSubmit();
    };
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onFocusOut = (_: FocusEvent) => {
      setTimeout(() => {
        const active = document.activeElement;

        // 対象がフォーム内、またはポータル内かどうかを判定
        const isStillInside =
          el.contains(active) ||
          // Combobox の popoverが open 中で、activeElement がそれに含まれている場合は true
          !!document.querySelector("[data-radix-popper-content-wrapper]")?.contains(active);

        if (!isStillInside) {
          onFinishEditing();
        }
      }, 500);
    };

    el.addEventListener("focusout", onFocusOut);
    return () => el.removeEventListener("focusout", onFocusOut);
  }, [onFinishEditing]);

  return (
    <Form {...form}>
      <form ref={ref} tabIndex={0} className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center">
          <Award className="text-muted-foreground mr-2 h-5 w-5" />
          <FormField
            control={form.control}
            name="name"
            render={({ field: { onBlur, ...field } }) => (
              <FormItem className="w-full">
                <Input placeholder="資格名を入力" onBlur={handleBlur(onBlur)} autoFocus {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center">
          <Calendar className="text-muted-foreground mr-2 h-5 w-5" />
          <FormYearMonthField
            control={form.control}
            yearName="year"
            monthName="month"
            onBlur={() => {
              autoSubmit();
            }}
          />
        </div>
        <div className="flex items-center">
          <Building2 className="text-muted-foreground mr-2 h-5 w-5" />
          <FormField
            control={form.control}
            name="issuer"
            render={({ field: { onBlur, ...field } }) => (
              <FormItem className="w-full">
                <Input placeholder="発行団体名を入力（任意）" onBlur={handleBlur(onBlur)} {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center">
          <Link className="text-muted-foreground mr-2 h-5 w-5" />
          <FormField
            control={form.control}
            name="url"
            render={({ field: { onBlur, ...field } }) => (
              <FormItem className="w-full">
                <Input placeholder="認定証のURLなどを入力（任意）" onBlur={handleBlur(onBlur)} {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
