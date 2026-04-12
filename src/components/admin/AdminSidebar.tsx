import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { sidebarAdminContent } from "@/utils/sidebarContent";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function AdminSidebar() {
  return (
    <Sidebar>
      <h2 className="mb-4 hidden text-xl font-bold md:block">Panel Admina</h2>
      {sidebarAdminContent.map((item) => {
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
      <hr className="my-6" />
      <Link
        href="/course/1/1"
        className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
      >
        <ChevronLeft className="h-5 w-5" />
        Wróć do kursu
      </Link>
    </Sidebar>
  );
}
