"use client";

import { Lesson } from "@/utils/types";
import { LessonPdfState } from "@/hooks/useLessonPdf";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { VideoPlayer } from "@/components/course/VideoPlayer";
import { PdfDropzone } from "@/components/admin/PdfDropzone";

type LessonContentFieldProps = {
  type: Lesson["type"];
  lesson?: Lesson;
  videoUrl: string;
  onVideoUrlChange: (url: string) => void;
  pdf: LessonPdfState;
  disabled: boolean;
};

export function LessonContentField({
  type,
  lesson,
  videoUrl,
  onVideoUrlChange,
  pdf,
  disabled,
}: LessonContentFieldProps) {
  if (type === "video") {
    return (
      <FormField
        label="Link do wideo (YouTube)"
        htmlFor="lesson-video-url"
        required
      >
        <Input
          id="lesson-video-url"
          name="video_url"
          placeholder="https://www.youtube.com/embed/..."
          value={videoUrl}
          onChange={(event) => onVideoUrlChange(event.target.value)}
          required
        />
        {videoUrl && (
          <VideoPlayer lesson={{ video_url: videoUrl, title: "Podgląd" }} />
        )}
      </FormField>
    );
  }

  if (type === "pdf") {
    return (
      <FormField label="Plik PDF" required>
        <PdfDropzone
          file={pdf.file}
          existingUrl={pdf.existingUrl}
          onSelect={pdf.select}
          onRemove={pdf.remove}
          disabled={disabled}
        />
      </FormField>
    );
  }

  return (
    <FormField label="Treść lekcji" htmlFor="lesson-text-content" required>
      <Textarea
        id="lesson-text-content"
        name="text_content"
        placeholder="Treść lekcji..."
        defaultValue={lesson?.text_content}
        rows={8}
        required
      />
    </FormField>
  );
}
