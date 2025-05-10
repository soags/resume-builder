import { zodResolver } from "@hookform/resolvers/zod";
import { Award, Building2, Calendar, Link } from "lucide-react";
import { useForm } from "react-hook-form";
import { CertFormData, certSchema } from "../schema";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@/components/ui/form";
import { FormYearMonthField } from "@/components/FormYearMonthField";
import { FocusEventHandler, useRef } from "react";

type CertItemEditProps = {
  defaultValues: CertFormData;
  onSubmit: (data: CertFormData) => void;
  onFinishEditing: () => void;
};

export function CertItemEdit({
  defaultValues,
  onSubmit,
  onFinishEditing,
}: CertItemEditProps) {
  const ref = useRef<HTMLFormElement>(null);
  const form = useForm({
    resolver: zodResolver(certSchema),
    defaultValues,
  });

  const autoSubmit = () => {
    form.handleSubmit(onSubmit)();
  };

  const handleFormBlur: FocusEventHandler<HTMLFormElement> = (e) => {
    const nextFocused = e.relatedTarget as HTMLElement | null;
    const isStillInside = ref.current?.contains(nextFocused);

    if (!isStillInside) {
      onFinishEditing();
    }
  };

  return (
    <Form {...form}>
      <form
        ref={ref}
        tabIndex={0}
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        onBlur={handleFormBlur}
      >
        <div className="flex items-center">
          <Award className="text-muted-foreground mr-2 h-5 w-5" />
          <FormField
            control={form.control}
            name="name"
            render={({ field: { onBlur, ...field } }) => (
              <FormItem className="w-full">
                <Input
                  placeholder="資格名を入力"
                  onBlur={() => {
                    onBlur();
                    autoSubmit();
                  }}
                  {...field}
                />
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
                <Input
                  placeholder="発行団体名を入力（任意）"
                  onBlur={() => {
                    onBlur();
                    autoSubmit();
                  }}
                  {...field}
                />
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
                <Input
                  placeholder="認定証のURLなどを入力（任意）"
                  onBlur={() => {
                    onBlur();
                    autoSubmit();
                  }}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
