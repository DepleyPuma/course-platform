import { CourseSidebar } from "@/components/course/CourseSidebar";
import { getAllModules, getCompletedLessons } from "@/utils/actions";

export default async function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modulesResult, completedLessonsResult] = await Promise.all([
    getAllModules(),
    getCompletedLessons(),
  ]);
  const result = await getAllModules();

  if (!modulesResult.success) return;
  if (!completedLessonsResult.success) return;

  return (
    <div className="flex flex-1 overflow-hidden">
      <CourseSidebar
        sidebarCourseContent={modulesResult.data}
        completedLessonsIds={completedLessonsResult.data}
      />
      {children}
    </div>
  );
}
