import { CourseSidebar } from "@/components/course/CourseSidebar";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import {
  sidebarCourseContent,
  sidebarSettingsContent,
} from "@/utils/sidebarContent";
import Link from "next/link";

export default async function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* <Sidebar>
        <h2 className="mb-4 hidden text-xl font-bold md:block">OSP Marki</h2>
        <p className="mb-6 text-sm text-gray-600">Wstęp</p>
        {sidebarCourseContent.map((module) => (
          <div
            key={module.id}
            className="rounded-lg border border-gray-200 bg-white"
          >
            <Button
              variant="ghost"
              type="button"
              className="flex w-full cursor-pointer items-center justify-between px-4 py-6 transition-colors hover:bg-gray-50"
            >
              <span className="text-left text-lg font-semibold">
                {module.title}
              </span>
            </Button>
          </div>
        ))}
        <hr />
        {sidebarSettingsContent.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </Sidebar> */}
      <CourseSidebar sidebarCourseContent={sidebarCourseContent} />
      {children}
    </div>
  );
}
