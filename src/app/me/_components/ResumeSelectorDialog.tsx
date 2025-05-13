import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Resume } from "@/generated/prisma/client";
import { formatDate } from "@/lib/utils";
import { useResumeStore } from "@/stores/resumeStore";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type ResumeSelectorDialogProps = {
  resumes: Resume[];
};

export function ResumeSelectorDialog({ resumes }: ResumeSelectorDialogProps) {
  const { resumeId } = useResumeStore();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const selectedResume = useMemo(() => resumes.find((r) => r.id === resumeId), [resumes, resumeId]);

  const handleSelect = (resumeId: string) => {
    setOpen(false);
    router.push(`/me/resumes/${resumeId}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {selectedResume?.title}
          <ChevronDown />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>職務経歴書を選択</DialogTitle>
        </DialogHeader>
        <div className="h-[300px] overflow-auto">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-2">タイトル</th>
                <th className="border p-2">最終更新日</th>
                <th className="border p-2">選択</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map((resume) => (
                <tr key={resume.id} className="hover:bg-gray-50">
                  <td className="border p-2">{resume.title}</td>
                  <td className="border p-2">{formatDate(resume.updatedAt)}</td>
                  <td className="border p-2 text-center">
                    <button className="text-blue-600 hover:underline" onClick={() => handleSelect(resume.id)}>
                      選択
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <DialogClose asChild>
            <button className="text-sm text-gray-500 hover:underline">キャンセル</button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
