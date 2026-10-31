"use client";

import { startTransition, useActionState, useEffect } from "react";
import type { SubmitEvent } from "react";
import { toast } from "sonner";
import { Lesson } from "@/utils/types";
import {
  addLessonAction,
  updateLessonAction,
} from "@/actions/admin/lessons.actions";
import { LessonPdfState } from "@/hooks/useLessonPdf";

type UseLessonFormArgs = {
  lesson?: Lesson;
  type: Lesson["type"];
  pdf: LessonPdfState;
};

export function useLessonForm({ lesson, type, pdf }: UseLessonFormArgs) {
  const [state, formAction, isPending] = useActionState(
    lesson ? updateLessonAction : addLessonAction,
    {},
  );

  useEffect(() => {
    if (state?.success === false) {
      toast.error(state.error);
    }
  }, [state]);

  const isBusy = isPending || pdf.isUploading;

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isBusy) return;

    const formData = new FormData(event.currentTarget);

    if (type === "pdf" && !(await pdf.applyToFormData(formData))) {
      return;
    }

    startTransition(() => formAction(formData));
  }

  return { handleSubmit, isPending, isBusy };
}
