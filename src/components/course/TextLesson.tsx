import { Lesson } from "@/utils/types";

type TextLessonTypeProps = {
  lesson: Lesson;
};

export const TextLesson = ({ lesson }: TextLessonTypeProps) => {
  return (
    <div className="mb-6 w-full max-w-350 rounded-lg bg-white p-6">
      <p className="whitespace-pre-wrap text-gray-700">{lesson.text_content}</p>
    </div>
  );
};
