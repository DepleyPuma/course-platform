import { getModuleByIdAdmin } from "@/actions/admin/modules.actions";
import { getModuleLessonsAdmin } from "@/actions/admin/lessons.actions";
import { ErrorMessage } from "@/components/ui/error-message";
import { LessonsView } from "@/components/admin/LessonsView";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Folder, Plus } from "lucide-react";
import Link from "next/link";

async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;

  const [moduleResult, lessonsResult] = await Promise.all([
    getModuleByIdAdmin(moduleId),
    getModuleLessonsAdmin(moduleId),
  ]);

  if (!moduleResult.success) {
    return <ErrorMessage>Nie udało się pobrać danych modułu.</ErrorMessage>;
  }

  if (!lessonsResult.success) {
    return <ErrorMessage>Nie udało się pobrać danych.</ErrorMessage>;
  }

  const currentModule = moduleResult.data;
  const lessons = lessonsResult.data;

  return (
    <div>
      <Link
        href="/admin/modules"
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ChevronLeft className="h-4 w-4" />
        Wróć do modułów
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Folder
            className="h-8 w-8 shrink-0 text-yellow-500"
            fill="currentColor"
          />
          <div>
            <h1 className="text-3xl font-bold">{currentModule.title}</h1>
            <p className="text-sm text-gray-500">{lessons.length} lekcje</p>
          </div>
        </div>
        <Link href={`/admin/modules/${moduleId}/lessons/new`}>
          <Button className="bg-brand hover:bg-brand-hover cursor-pointer text-black">
            <Plus className="h-4 w-4" />
            Dodaj nową lekcję
          </Button>
        </Link>
      </div>

      <LessonsView lessons={lessons} moduleId={moduleId} />
    </div>
  );
}

export default ModulePage;
