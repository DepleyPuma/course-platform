import { getModuleByIdAdmin } from "@/actions/admin/modules.actions";
import { ErrorMessage } from "@/components/ui/error-message";
import { LessonForm } from "@/components/admin/LessonForm";

async function NewLessonPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;

  const moduleResult = await getModuleByIdAdmin(moduleId);

  if (!moduleResult.success) {
    return <ErrorMessage>Nie udało się pobrać danych modułu.</ErrorMessage>;
  }

  return (
    <LessonForm moduleId={moduleId} moduleTitle={moduleResult.data.title} />
  );
}

export default NewLessonPage;
