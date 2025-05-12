import { useEffect, useId, useState } from "react";
import { Input } from "./ui/input";
import { Pencil, Save, X } from "lucide-react";
import { Button } from "./ui/button";

export type EditableInputProps = {
  value: string;
  onSave: (value: string) => void;
};

export function EditableInput({ value: initialValue, onSave }: EditableInputProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const id = useId();

  useEffect(() => {
    if (!editing) {
      setValue(initialValue);
    }
  }, [initialValue, editing]);

  const handleSave = () => {
    onSave(value);
    setEditing(false);
  };

  const handleCancel = () => {
    setValue(initialValue);
    setEditing(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const nextId = (e.relatedTarget as HTMLElement | null)?.id;
    if (nextId === `${id}-cancel`) {
      handleCancel();
    } else {
      handleSave();
    }
  };

  return (
    <div className="flex items-center gap-2">
      {editing ? (
        <>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
              } else if (e.key === "Escape") {
                handleCancel();
              }
            }}
            onBlur={handleBlur}
            autoFocus
          />
          <Button id={`${id}-save`} variant="ghost" size="icon" onClick={handleSave}>
            <Save className="h-4 w-4" />
          </Button>
          <Button id={`${id}-cancel`} variant="ghost" size="icon" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <button
          className="hover:bg-muted flex items-center gap-2 rounded px-2 py-1 text-lg font-medium"
          onClick={() => setEditing(true)}
        >
          {value}
          <Pencil className="text-muted-foreground h-4 w-4" />
        </button>
      )}
    </div>
  );
}
