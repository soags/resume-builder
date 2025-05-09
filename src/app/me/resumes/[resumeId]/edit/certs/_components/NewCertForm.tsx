"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/form";
import { PlusCircle } from "lucide-react";

export function NewCertForm() {
  return (
    <Card className="p-0">
      <CardContent className="py-4">
        <h2 className="mb-4 text-lg font-semibold">新しい資格の追加</h2>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="newName">
              資格名 <span className="text-red-500">*</span>
            </Label>
            <Input id="newName" placeholder="資格名を入力" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="newIssuer">資格名</Label>
            <Input id="newIssuer" placeholder="発行団体名を入力（任意）" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="newDate">
              取得年月 <span className="text-red-500">*</span>
            </Label>
            <Input id="newDate" type="month" required />
          </div>
          <Button className="mt-2">
            <PlusCircle className="mr-2 h-4 w-4" />
            追加する
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
