"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cert } from "@/generated/prisma/client";
import { formatMonthJp } from "@/lib/utils";
import { Award, Building2, Calendar, Trash2 } from "lucide-react";

type CertItemProps = {
  cert: Cert;
  onDelete: (id: string) => void;
};

export function CertItem({ cert, onDelete }: CertItemProps) {
  return (
    <Card className="p-0 transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
          <div className="space-y-3">
            <div className="cursor-pointer">
              <div className="flex items-center">
                <Award className="text-muted-foreground mr-2 h-5 w-5" />
                <h3 className="text-lg font-medium">{cert.name}</h3>
              </div>
              {cert.issuer && (
                <div className="mt-2 flex items-center">
                  <Building2 className="text-muted-foreground mr-2 h-5 w-5" />
                  <p className="text-muted-foreground">{cert.issuer}</p>
                </div>
              )}
              <div className="mt-2 flex items-center">
                <Calendar className="text-muted-foreground mr-2 h-5 w-5" />
                <p className="text-muted-foreground">
                  {formatMonthJp(cert.year, cert.month)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:bg-red-50 hover:text-red-700"
              onClick={() => onDelete(cert.id)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
