"use client";

import { Cert } from "@/generated/prisma/client";
import { formatMonthJp } from "@/lib/utils";
import { AwardIcon, Building2Icon, CalendarIcon, LinkIcon } from "lucide-react";
import Link from "next/link";

type CertItemProps = {
  cert: Cert;
  onStartEditing: () => void;
};

export function CertItemView({ cert, onStartEditing }: CertItemProps) {
  return (
    <div className="cursor-pointer" onClick={() => onStartEditing()}>
      <div className="flex items-center">
        <AwardIcon className="text-muted-foreground mr-2 h-5 w-5" />
        <h3 className="text-lg font-medium">{cert.name}</h3>
      </div>
      <div className="mt-2 flex items-center">
        <CalendarIcon className="text-muted-foreground mr-2 h-5 w-5" />
        <p className="text-muted-foreground">
          {formatMonthJp(cert.year, cert.month)}
        </p>
      </div>
      {cert.issuer && (
        <div className="mt-2 flex items-center">
          <Building2Icon className="text-muted-foreground mr-2 h-5 w-5" />
          <p className="text-muted-foreground">{cert.issuer}</p>
        </div>
      )}
      {cert.url && (
        <div className="mt-2 flex items-center">
          <LinkIcon className="text-muted-foreground mr-2 h-5 w-5" />
          <Link
            href={cert.url}
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            <p className="break-all">{cert.url}</p>
          </Link>
        </div>
      )}
    </div>
  );
}
