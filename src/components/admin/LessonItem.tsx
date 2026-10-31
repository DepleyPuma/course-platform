"use client";

import { Lesson } from "@/utils/types";
import { LESSON_TYPE_DISPLAY } from "@/utils/lesson";
import { useSortable } from "@dnd-kit/react/sortable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popup } from "@/components/Popup";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteLesson } from "@/actions/admin/lessons.actions";

export const LessonItem = ({
  lesson,
  moduleId,
  index,
}: {
  lesson: Lesson;
  moduleId: string;
  index: number;
}) => {
  const { ref, handleRef, isDragging } = useSortable({
    id: lesson.id,
    index,
  });

  const { icon: TypeIcon, label, bg, color } = LESSON_TYPE_DISPLAY[lesson.type];

  async function handleDelete() {
    const result = await deleteLesson(lesson.id, moduleId);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Lekcja usunięta pomyślnie");
  }

  return (
    <div
      ref={ref}
      className={`relative flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 hover:bg-gray-50 sm:flex-row sm:items-center ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start gap-3 sm:flex-1 sm:items-center">
        <Button
          variant="ghost"
          type="button"
          ref={handleRef}
          className="relative z-10 cursor-grab touch-none text-gray-400 hover:text-gray-600 active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5" />
        </Button>
        <div className={`rounded-lg p-2 ${bg}`}>
          <TypeIcon className={`h-5 w-5 shrink-0 ${color}`} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h2 className="font-semibold wrap-break-word">{lesson.title}</h2>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <TypeIcon className="h-3.5 w-3.5" />
              {label}
              {lesson.video_duration ? ` · ${lesson.video_duration}` : ""}
            </span>
            <Badge
              variant="outline"
              className={
                lesson.status === "published"
                  ? "rounded-full border-green-200 bg-green-50 text-green-700"
                  : "rounded-full border-amber-400 bg-amber-100 text-amber-600"
              }
            >
              {lesson.status === "published" ? "opublikowana" : "szkic"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-end gap-1 self-end sm:self-auto">
        <Link href={`/admin/modules/${moduleId}/lessons/${lesson.id}/edit`}>
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <Pencil className="h-4 w-4" />
          </Button>
        </Link>
        <Popup
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          }
          title="Usuń lekcję"
          description={`Czy na pewno chcesz usunąć lekcję ${lesson.title}?`}
          confirmLabel="Tak, usuń"
          confirmVariant="destructive"
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
};
