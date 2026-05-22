import { VideoPlayer } from "@/components/course/VideoPlayer";
import { Button } from "@/components/ui/button";
import { getAllModules, getLessonById } from "@/utils/actions";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

async function LessonPage({
  params,
}: {
  params: { moduleId: string; lessonId: string };
}) {
  const { moduleId, lessonId } = await params;

  const [lessonResult, modulesResult] = await Promise.all([
    getLessonById(lessonId),
    getAllModules(),
  ]);

  if (!lessonResult.success) {
    return (
      <div className="p-8 text-red-500">Nie udało się załadować lekcji.</div>
    );
  }

  const lesson = lessonResult.data;

  // Znajdź aktualny moduł i lekcje do nawigacji
  const currentModule = modulesResult.success
    ? modulesResult.data.find((m) => m.id === moduleId)
    : null;

  const lessons = currentModule?.lessons ?? [];
  const currentIndex = lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  return (
    <div className="flex h-full flex-1 flex-col items-start justify-start overflow-y-scroll p-4 md:p-8">
      {/* Header */}
      <header className="bg-white px-2 py-4">
        <p className="text-sm text-gray-500">{currentModule?.title}</p>
        <h1 className="text-2xl font-bold">{lesson.title}</h1>
      </header>

      {/* Video Player */}
      <div className="relative flex w-full justify-center">
        <VideoPlayer lesson={lesson} />
      </div>

      {/* Description */}
      <div className="flex-1 px-2 py-8">
        <h2 className="mb-4 text-xl font-semibold">Opis lekcji</h2>
        <p className="whitespace-pre-wrap text-gray-700">
          {lesson.description || "Brak opisu"}
        </p>
      </div>

      {/* Button navigation */}
      <div className="mx-auto flex w-full flex-col justify-between gap-4 border-t pt-6 sm:flex-row">
        <Button
          disabled={!prevLesson}
          className="flex cursor-pointer items-center gap-2 bg-[#BBCB2E] px-6 py-6 text-black hover:bg-[#a5b629] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
          asChild={!!prevLesson}
        >
          {prevLesson ? (
            <Link href={`/course/${moduleId}/${prevLesson.id}`}>
              <ArrowLeft className="h-4 w-4" />
              <span>Poprzednia lekcja</span>
            </Link>
          ) : (
            <>
              <ArrowLeft className="h-4 w-4" />
              <span>Poprzednia lekcja</span>
            </>
          )}
        </Button>

        <Button
          disabled={!nextLesson}
          className="flex cursor-pointer items-center gap-2 bg-[#BBCB2E] px-6 py-6 text-black hover:bg-[#a5b629] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
          asChild={!!nextLesson}
        >
          {nextLesson ? (
            <Link href={`/course/${moduleId}/${nextLesson.id}`}>
              <span>Zakończ i przejdź do następnej lekcji</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <>
              <span>Zakończ i przejdź do następnej lekcji</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default LessonPage;
