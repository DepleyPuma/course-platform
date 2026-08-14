import { NextLessonButton } from "@/components/course/NextLessonButton";
import { PrevLessonButton } from "@/components/course/PrevLessonButton";
import { VideoPlayer } from "@/components/course/VideoPlayer";
import { ErrorMessage } from "@/components/ui/error-message";
import { getAllModules, getLessonById } from "@/actions";
import { LessonContent } from "@/components/course/LessonContent";

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
    return <ErrorMessage>Nie udało się załadować lekcji.</ErrorMessage>;
  }

  if (!modulesResult.success) {
    return (
      <ErrorMessage>Nie udało się załadować aktualnego modułu.</ErrorMessage>
    );
  }

  const lesson = lessonResult.data;

  const currentModule = modulesResult.data.find((m) => m.id === moduleId);

  const currentModuleIndex = currentModule?.order_index;
  const prevModule = modulesResult.data.find(
    (m) => m.order_index === currentModuleIndex! - 1,
  );
  const nextModule = modulesResult.data.find(
    (m) => m.order_index === currentModuleIndex! + 1,
  );

  const lessons = currentModule?.lessons ?? [];
  const currentLessonIndex = lessons.findIndex((l) => l.id === lessonId);
  const prevLesson =
    currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < lessons.length - 1
      ? lessons[currentLessonIndex + 1]
      : null;

  const handleNextLesson = () => {
    if (nextLesson) {
      return `/course/${moduleId}/${nextLesson.id}`;
    } else {
      if (!nextModule || !nextModule.lessons?.[0]) return undefined;
      return `/course/${nextModule.id}/${nextModule.lessons[0].id}`;
    }
  };

  const handlePrevLesson = () => {
    if (prevLesson) {
      return `/course/${moduleId}/${prevLesson.id}`;
    } else if (prevModule) {
      const prevModuleLastLesson =
        prevModule?.lessons![prevModule.lessons!.length - 1];
      return `/course/${prevModule?.id}/${prevModuleLastLesson?.id}`;
    } else {
      return undefined;
    }
  };

  const prevHref = handlePrevLesson();
  const nextHref = handleNextLesson();

  return (
    <div className="flex h-full flex-1 flex-col items-start justify-start overflow-y-scroll p-4 md:p-8">
      <header className="bg-white px-2 py-4">
        <p className="text-sm text-gray-500">{currentModule?.title}</p>
        <h1 className="text-2xl font-bold">{lesson.title}</h1>
      </header>

      <LessonContent lesson={lesson} />

      <div className="flex-1 px-2 py-8">
        <h2 className="mb-4 text-xl font-semibold">Opis lekcji</h2>
        <p className="whitespace-pre-wrap text-gray-700">
          {lesson.description || "Brak opisu"}
        </p>
      </div>

      <div className="mx-auto flex w-full flex-col justify-between gap-4 border-t pt-6 sm:flex-row">
        <PrevLessonButton prevHref={prevHref} />
        <NextLessonButton lessonId={lessonId} nextHref={nextHref} />
      </div>
    </div>
  );
}

export default LessonPage;
