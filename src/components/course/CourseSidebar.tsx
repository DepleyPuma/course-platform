"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Module, Lesson, sidebarSettingsContent } from "@/utils/sidebarContent";
import Link from "next/link";
import { ChevronDown, ChevronRight, Circle, Play } from "lucide-react";

type CourseSidebarTypeProps = {
  sidebarCourseContent: Module[];
};

export const CourseSidebar = ({
  sidebarCourseContent,
}: CourseSidebarTypeProps) => {
  const [expandedModules, setExpandedModules] = useState<string[]>(["1"]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | undefined>(
    sidebarCourseContent[0]?.lessons![0],
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prevState) =>
      prevState.includes(moduleId)
        ? prevState.filter((id) => id !== moduleId)
        : [...prevState, moduleId],
    );
  };

  const handleLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
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
              {module.lessons?.map((lesson) => (
                <Link
                  href={`/course/${module.id}/${lesson.id}`}
                  onClick={() => handleLesson(lesson)}
                  key={lesson.id}
                  className={`flex w-full cursor-pointer items-start gap-3 px-4 py-3 transition-colors hover:bg-gray-50 ${
                    currentLesson?.id === lesson.id ? "bg-blue-50" : ""
                  }`}
                  title={lesson.title}
                >
                  <Circle className="mt-1.5 h-5 w-5 shrink-0 text-gray-400" />
                  <div className="truncate">
                    <p className="w-full">{lesson.title}</p>
                    <p className="flex items-center gap-2">
                      <Play className="h-3 w-3" />
                      {lesson.videoDuration}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
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
    </Sidebar>
  );
};
