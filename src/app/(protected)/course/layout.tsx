import { CourseSidebar } from "@/components/course/CourseSidebar";
import { getAllModules, getCompletedLessons } from "@/actions";

export default async function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modulesResult, completedLessonsResult] = await Promise.all([
    getAllModules(),
    getCompletedLessons(),
  ]);

  if (!modulesResult.success) return;
  if (!completedLessonsResult.success) return;

  return (
    <div className="flex flex-1 overflow-hidden">
      <CourseSidebar
        sidebarCourseContent={modulesResult.data}
        completedLessonsIds={completedLessonsResult.data}
      />
      <main className="flex h-full flex-1 flex-col items-start justify-start overflow-y-scroll p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
