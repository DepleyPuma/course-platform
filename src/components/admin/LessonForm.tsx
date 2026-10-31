"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Lesson } from "@/utils/types";
import { useLessonPdf } from "@/hooks/useLessonPdf";
import { useLessonForm } from "@/hooks/useLessonForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";
import { StatusRadioGroup } from "@/components/StatusRadioGroup";
import { LessonTypePicker } from "@/components/admin/LessonTypePicker";
import { LessonContentField } from "@/components/admin/LessonContentField";

type LessonFormProps = {
  moduleId: string;
  moduleTitle: string;
  lesson?: Lesson;
};

export function LessonForm({ moduleId, moduleTitle, lesson }: LessonFormProps) {
  const [type, setType] = useState<Lesson["type"]>(lesson?.type ?? "video");
  const [videoUrl, setVideoUrl] = useState(lesson?.video_url ?? "");

  const pdf = useLessonPdf(moduleId, lesson);
  const { handleSubmit, isBusy } = useLessonForm({ lesson, type, pdf });

  return (
    <div>
      <Link
        href={`/admin/modules/${moduleId}`}
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ChevronLeft className="h-4 w-4" />
        Wróć do modułu: {moduleTitle}
      </Link>

      <h1 className="mb-6 text-3xl font-bold">
        {lesson ? "Edytuj lekcję" : "Dodaj lekcję"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 rounded-lg border border-gray-200 bg-white p-6"
      >
        <input type="hidden" name="moduleId" value={moduleId} />
        {lesson && <input type="hidden" name="id" value={lesson.id} />}
        <input type="hidden" name="type" value={type} />

        <FormField label="Tytuł lekcji" htmlFor="lesson-title" required>
          <Input
            id="lesson-title"
            name="title"
            placeholder="np. Podstawy ratownictwa"
            defaultValue={lesson?.title}
            required
          />
        </FormField>

        <FormField label="Typ lekcji" required>
          <LessonTypePicker value={type} onChange={setType} />
        </FormField>

        <LessonContentField
          type={type}
          lesson={lesson}
          videoUrl={videoUrl}
          onVideoUrlChange={setVideoUrl}
          pdf={pdf}
          disabled={isBusy}
        />

        <FormField
          label="Opis lekcji (opcjonalny)"
          htmlFor="lesson-description"
        >
          <Textarea
            id="lesson-description"
            name="description"
            placeholder="Krótki opis co użytkownik się nauczy..."
            defaultValue={lesson?.description}
          />
        </FormField>

        <FormField label="Status">
          <StatusRadioGroup
            idPrefix="lesson"
            publishedLabel="Opublikowana"
            defaultValue={lesson?.status}
          />
        </FormField>

        <div className="flex justify-end gap-2">
          <Link href={`/admin/modules/${moduleId}`}>
            <Button type="button" variant="outline" className="cursor-pointer">
              Anuluj
            </Button>
          </Link>
          <Button
            type="submit"
            className="bg-brand hover:bg-brand-hover cursor-pointer text-black"
            disabled={isBusy}
          >
            {pdf.isUploading
              ? "Wysyłanie pliku..."
              : lesson
                ? "Zapisz zmiany"
                : "Utwórz lekcję"}
          </Button>
        </div>
      </form>
    </div>
  );
}
