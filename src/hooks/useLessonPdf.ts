"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Lesson } from "@/utils/types";
import { uploadLessonPdf } from "@/lib/supabase/storage";

export type LessonPdfState = {
  file: File | null;
  existingUrl: string;
  isUploading: boolean;
  select: (file: File) => void;
  remove: () => void;
  applyToFormData: (formData: FormData) => Promise<boolean>;
};

export function useLessonPdf(
  moduleId: string,
  lesson?: Lesson,
): LessonPdfState {
  const [file, setFile] = useState<File | null>(null);
  const [existingUrl, setExistingUrl] = useState(lesson?.pdf_url ?? "");
  const [isUploading, setIsUploading] = useState(false);

  function remove() {
    setFile(null);
    setExistingUrl("");
  }

  async function applyToFormData(formData: FormData): Promise<boolean> {
    if (!file && !existingUrl) {
      toast.error("Wybierz plik PDF");
      return false;
    }

    if (!file) {
      formData.set("pdf_url", existingUrl);
      return true;
    }

    setIsUploading(true);
    const uploaded = await uploadLessonPdf(file, moduleId);
    setIsUploading(false);

    if (!uploaded.success) {
      toast.error(uploaded.error);
      return false;
    }

    formData.set("pdf_url", uploaded.data.publicUrl);
    formData.set("pdf_path", uploaded.data.path);

    return true;
  }

  return {
    file,
    existingUrl,
    isUploading,
    select: setFile,
    remove,
    applyToFormData,
  };
}
