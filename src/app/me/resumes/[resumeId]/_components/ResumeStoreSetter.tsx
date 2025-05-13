"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useResumeStore } from "@/stores/resumeStore";

export function ResumeStoreSetter() {
  const { resumeId: paramId } = useParams();
  const { resumeId, setResumeId } = useResumeStore();

  useEffect(() => {
    if (typeof paramId === "string" && paramId !== resumeId) {
      setResumeId(paramId);
    }
  }, [paramId, resumeId, setResumeId]);

  return null;
}
