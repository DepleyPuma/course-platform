"use client";

import { useEffect, useState } from "react";
import { DragDropProvider, DragEndEvent } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { Lesson } from "@/utils/types";
import { LessonItem } from "@/components/admin/LessonItem";
import { Button } from "@/components/ui/button";
import { updateLessonsOrder } from "@/actions/admin/lessons.actions";
import { toast } from "sonner";

export const LessonsView = ({
  lessons: initialLessons,
  moduleId,
}: {
  lessons: Lesson[];
  moduleId: string;
}) => {
  const [lessons, setLessons] = useState(initialLessons);

  const isLessonsChanged = lessons.some(
    (lesson, index) => lesson.id !== initialLessons[index]?.id,
  );

  function handleDragEnd(event: DragEndEvent) {
    if (event.canceled) return;

    setLessons((items) => move(items, event));
  }

  async function handleSaveChanges() {
    const reorderedLessons = lessons.map((lesson, index) => ({
      ...lesson,
      order_index: index,
    }));
    const result = await updateLessonsOrder(reorderedLessons, moduleId);
    if (result.success) {
      setLessons(reorderedLessons);
      toast.success("Kolejność lekcji zaktualizowana");
    } else {
      toast.error(result.error);
    }
  }

  useEffect(() => {
    setLessons(initialLessons);
  }, [initialLessons]);

  return (
    <div className="relative pt-10">
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="flex flex-col gap-3">
          {lessons.map((lesson, index) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              moduleId={moduleId}
              index={index}
            />
          ))}
        </div>
      </DragDropProvider>
      {isLessonsChanged && (
        <div className="fixed right-6 bottom-6">
          <Button
            onClick={handleSaveChanges}
            className="bg-brand hover:bg-brand-hover cursor-pointer text-black"
          >
            Zapisz zmiany
          </Button>
        </div>
      )}
    </div>
  );
};
