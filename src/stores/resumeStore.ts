import { create } from "zustand";

type ResumeStore = {
  resumeId: string | null;
  setResumeId: (id: string) => void;
  clearResumeId: () => void;
};

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeId: null,
  setResumeId: (resumeId) => set({ resumeId }),
  clearResumeId: () => set({ resumeId: null }),
}));
