"use client";

import { Sidebar } from "@/components/Sidebar";
import { Lesson, Module } from "@/utils/types";
import {
  AlignLeft,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  FileText,
  LucideIcon,
  Play,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type CourseSidebarTypeProps = {
  sidebarCourseContent: Module[];
  completedLessonsIds: string[];
};

const convertTime = (time: string | undefined) => {
  if (!time) return;

  const [h, m, s] = time.split(":").map(Number);

  if (h > 0) {
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

const LESSON_TYPE_META: Record<
  Lesson["type"],
  { icon: LucideIcon; label: (lesson: Lesson) => string | undefined }
> = {
  video: { icon: Play, label: (lesson) => convertTime(lesson.video_duration) },
  pdf: { icon: FileText, label: () => "PDF" },
  text: { icon: AlignLeft, label: () => "Tekst" },
};

export const CourseSidebar = ({
  sidebarCourseContent,
  completedLessonsIds,
}: CourseSidebarTypeProps) => {
  const pathname = usePathname();
  const activeModuleId = pathname.split("/")[2];

  const [expandedModules, setExpandedModules] = useState<string[]>([
    activeModuleId ?? sidebarCourseContent[0].id,
  ]);
  const [prevActiveModuleId, setPrevActiveModuleId] = useState(activeModuleId);

  if (activeModuleId !== prevActiveModuleId) {
    setPrevActiveModuleId(activeModuleId);

    if (activeModuleId && !expandedModules.includes(activeModuleId)) {
      setExpandedModules([...expandedModules, activeModuleId]);
    }
  }

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prevState) =>
      prevState.includes(moduleId)
        ? prevState.filter((id) => id !== moduleId)
        : [...prevState, moduleId],
    );
  };

  return (
    <Sidebar>
      <h2 className="mb-4 hidden text-xl font-bold md:block">OSP Marki</h2>
      <p className="mb-6 text-sm text-gray-600">Wstęp</p>
      {sidebarCourseContent.map((module) => (
        <div
          key={module.id}
          className="rounded-lg border border-gray-200 bg-white"
        >
          {/* module header text */}
          <div
            onClick={() => toggleModule(module.id)}
            className="flex w-full cursor-pointer flex-col items-start justify-between transition-colors hover:bg-gray-50"
          >
            <h6 className="flex w-full items-center justify-between gap-2 px-4 py-6">
              <span
                className="min-w-0 flex-1 truncate text-left text-lg font-semibold"
                title={module.title}
              >
                {module.title}
              </span>
              {expandedModules.includes(module.id) ? (
                <ChevronDown className="h-5 w-5 shrink-0 text-gray-500" />
              ) : (
                <ChevronRight className="h-5 w-5 shrink-0 text-gray-500" />
              )}
            </h6>
          </div>

          {/* lessons if module is open */}
          {expandedModules.includes(module.id) && (
            <div className="w-full border-t border-gray-200">
              {module.lessons?.map((lesson) => {
                const href = `/course/${module.id}/${lesson.id}`;
                const isActive = pathname === href;
                const { icon: LessonTypeIcon, label } =
                  LESSON_TYPE_META[lesson.type];

                return (
                  <Link
                    href={href}
                    key={lesson.id}
                    className={`flex w-full cursor-pointer items-start gap-3 px-4 py-3 transition-colors hover:bg-gray-50 ${
                      isActive ? "bg-blue-50" : ""
                    }`}
                    title={lesson.title}
                  >
                    {completedLessonsIds.includes(lesson.id) ? (
                      <CheckCircle2 className="text-brand mt-2 h-5 w-5 shrink-0" />
                    ) : (
                      <Circle className="mt-2 h-5 w-5 shrink-0 text-gray-400" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate">{lesson.title}</p>
                      <p className="flex items-center gap-2">
                        <LessonTypeIcon className="h-3 w-3" />
                        {label(lesson)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ))}

      <hr />

      <Link
        href="/settings"
        className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
      >
        <Settings className="h-5 w-5" />
        <span>Ustawienia</span>
      </Link>
    </Sidebar>
  );
};
