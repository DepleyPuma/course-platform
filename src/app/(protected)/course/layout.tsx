import { CourseSidebar } from "@/components/course/CourseSidebar";
import { sidebarCourseContent } from "@/utils/sidebarContent";

export default async function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <CourseSidebar sidebarCourseContent={sidebarCourseContent} />
      {children}
    </div>
  );
}
