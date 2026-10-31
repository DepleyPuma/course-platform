import { getModuleByIdAdmin } from "@/actions/admin/modules.actions";
import { getLessonByIdAdmin } from "@/actions/admin/lessons.actions";
import { ErrorMessage } from "@/components/ui/error-message";
import { LessonForm } from "@/components/admin/LessonForm";

async function LessonEditPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = await params;

  const [moduleResult, lessonResult] = await Promise.all([
    getModuleByIdAdmin(moduleId),
    getLessonByIdAdmin(lessonId),
  ]);

  if (!moduleResult.success) {
    return <ErrorMessage>Nie udało się pobrać danych modułu.</ErrorMessage>;
  }

  if (!lessonResult.success) {
    return <ErrorMessage>Nie udało się pobrać danych lekcji.</ErrorMessage>;
  }

  return (
    <LessonForm
      moduleId={moduleId}
      moduleTitle={moduleResult.data.title}
      lesson={lessonResult.data}
    />
  );
}

export default LessonEditPage;
