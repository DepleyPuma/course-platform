import React from "react";
import { Sidebar } from "@/components/Sidebar";
import Link from "next/link";
import { BookOpen, Settings } from "lucide-react";
import { goBackToFirstLesson } from "@/utils/actions";

export async function SettingsSidebar() {
  const results = await goBackToFirstLesson();

  if (!results.success) return;

  const href = results.data;

  return (
    <Sidebar>
      <Link
        href={href!}
        className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
      >
        <BookOpen className="h-5 w-5" />
        <span>Kurs</span>
      </Link>
      <Link
        href="/settings"
        className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
      >
        <Settings className="h-5 w-5" />
        <span>Ustawienia</span>
      </Link>
    </Sidebar>
  );
}
