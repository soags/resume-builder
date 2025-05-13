"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Resume } from "@/generated/prisma/client";
import { formatDate } from "@/lib/utils";
import { Download, Edit, Ellipsis, Monitor } from "lucide-react";
import { useRouter } from "next/navigation";

type ResumeTableProps = {
  items: Resume[];
};

export function ResumeTable({ items }: ResumeTableProps) {
  const router = useRouter();

  const handleEdit = (resumeId: string) => {
    router.push(`/me/resumes/${resumeId}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>タイトル</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>公開状態</TableHead>
          <TableHead>最終更新日</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>{item.slug}</TableCell>
            <TableCell>非公開</TableCell>
            <TableCell>{formatDate(item.updatedAt)}</TableCell>
            <TableCell className="flex justify-end space-x-2">
              <Button
                variant="ghost"
                className="hover:cursor-pointer"
                onClick={() => handleEdit(item.id)}
              >
                <Edit />
                編集
              </Button>
              <Button variant="ghost" className="hover:cursor-pointer">
                <Monitor />
                プレビュー
              </Button>
              <Button variant="ghost" className="hover:cursor-pointer">
                <Download />
                ダウンロード
              </Button>
              <Button variant="ghost" className="hover:cursor-pointer">
                <Ellipsis />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
