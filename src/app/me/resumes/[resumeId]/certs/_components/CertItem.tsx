"use client";

import { Cert } from "@/generated/prisma/client";
import { CertItemEdit } from "./CertItemEdit";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { CertItemView } from "./CertItemView";
import { CertFormData } from "../schema";

type CertItemProps = {
  cert: Cert;
  onSubmit: (id: string, data: CertFormData) => void;
  onDelete: (id: string) => void;
};

export function CertItem({ cert, onSubmit, onDelete }: CertItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className="p-0 transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
          {isEditing ? (
            <CertItemEdit
              defaultValues={cert}
              onSubmit={(data) => onSubmit(cert.id, data)}
              onFinishEditing={() => setIsEditing(false)}
            />
          ) : (
            <CertItemView
              cert={cert}
              onStartEditing={() => setIsEditing(true)}
            />
          )}
          <div className="flex items-start justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:bg-red-50 hover:text-red-700"
              aria-label="削除"
              onClick={() => onDelete(cert.id)}
            >
              <Trash2Icon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
