import { Pencil } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type EditBadgeButtonProps = {
  tooltip: string;
  onClick: () => void;
};

export function EditBadgeButton({ tooltip, onClick }: EditBadgeButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="inline-flex h-[26px] w-[26px] shrink-0 cursor-pointer items-center justify-center rounded text-gray-500 hover:text-gray-700"
            role="button"
            aria-label={tooltip}
            onClick={onClick}
          >
            <Pencil className="h-[16px] w-[16px]" />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
