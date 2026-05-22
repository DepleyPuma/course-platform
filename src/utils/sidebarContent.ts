import { BookOpen, LayoutDashboard, Settings, Users } from "lucide-react";

export interface LessonPreview {
  id: string;
  title: string;
  order_index: number;
  video_duration?: string;
}
export interface Lesson extends LessonPreview {
  type: "video" | "pdf" | "text";
  description?: string;
  video_url?: string;
  pdf_url?: string;
  text_content?: string;
  status: "published" | "draft";
}

export interface Module {
  id: string;
  title: string;
  order_index: number;
  status: "published" | "draft";
  lessons?: Lesson[];
}

export const sidebarSettingsContent = [
  {
    icon: BookOpen,
    label: "Kurs",
    path: "/course/1/1",
  },
  {
    icon: Settings,
    label: "Ustawienia",
    path: "/settings",
  },
];

export const sidebarAdminContent = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: BookOpen,
    label: "Moduły",
    path: "/admin/modules",
  },
  {
    icon: Users,
    label: "Użytkownicy",
    path: "/admin/users",
  },
];
