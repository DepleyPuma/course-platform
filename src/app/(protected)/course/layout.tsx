import { CourseSidebar } from "@/components/course/CourseSidebar";
import { getAllModules } from "@/utils/actions";

export default async function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await getAllModules();

  if (!result.success) return;

  const { data } = result;

  console.log(data);

  return (
    <div className="flex flex-1 overflow-hidden">
      <CourseSidebar sidebarCourseContent={data} />
      {children}
    </div>
  );
}
