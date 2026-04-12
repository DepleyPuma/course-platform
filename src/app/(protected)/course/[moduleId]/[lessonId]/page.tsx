import { VideoPlayer } from "@/components/course/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Lesson, sidebarCourseContent } from "@/utils/sidebarContent";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

async function LessonPage({
  params,
}: {
  params: { moduleId: string; lessonId: string };
}) {
  const { moduleId, lessonId } = await params;

  const currentModule = sidebarCourseContent.find(
    (module) => module.id === moduleId,
  )!;

  const lessons = currentModule.lessons;
  const lesson = lessons?.find((lesson) => lesson.id === lessonId) as Lesson;

  console.log(moduleId);
  console.log(lessonId);
  console.log(lesson);

  return (
    <div className="flex h-full flex-1 flex-col items-start justify-start overflow-y-scroll p-4 md:p-8">
      {/* Header */}
      <header className="bg-white px-2 py-4 2xl:mx-32">
        <p className="text-sm text-gray-500">{lesson.title}</p>
        <h1 className="text-2xl font-bold">{lesson.title}</h1>
      </header>

      {/* Video Player */}
      <div className="relative mx-0 mt-6 aspect-video w-full max-w-5xl 2xl:mx-32">
        <VideoPlayer lesson={lesson} />
      </div>

      {/* Description */}
      <div className="flex-1 px-2 py-8 2xl:mx-32">
        <h2 className="mb-4 text-xl font-semibold">Opis lekcji</h2>
        <p className="whitespace-pre-wrap text-gray-700">
          {lesson.description || "Brak opisu"}
        </p>
      </div>

      <div className="mx-auto flex w-full flex-col justify-between gap-4 border-t pt-6 sm:flex-row 2xl:ml-32 2xl:w-[80%]">
        <Button className="flex cursor-pointer items-center gap-2 bg-[#BBCB2E] px-6 py-6 text-black hover:bg-[#a5b629] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50">
          <ArrowLeft className="h-4 w-4" />
          <span>Poprzednia lekcja</span>
        </Button>

        <Button className="flex cursor-pointer items-center gap-2 bg-[#BBCB2E] px-6 py-6 text-black hover:bg-[#a5b629] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50">
          <span>Zakończ i przejdź do następnej lekcji</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default LessonPage;
