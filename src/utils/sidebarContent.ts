import { BookOpen, Settings } from "lucide-react";

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  type: "video" | "pdf" | "text";
  description?: string;
  videoUrl?: string;
  videoDuration?: string;
  pdfUrl?: string;
  textContent?: string;
  orderIndex: number;
  status: "published" | "draft";
}

export interface Module {
  id: string;
  title: string;
  orderIndex: number;
  status: "published" | "draft";
  lessons?: Lesson[];
}

export const sidebarSettingsContent = [
  {
    icon: BookOpen,
    label: "Kurs",
    path: "/course",
  },
  {
    icon: Settings,
    label: "Ustawienia",
    path: "/settings",
  },
];

export const sidebarCourseContent: Module[] = [
  {
    id: "1",
    title: "Wprowadzenie",
    orderIndex: 1,
    status: "published",
    lessons: [
      {
        id: "1",
        moduleId: "1",
        title: "Czym jest Tailwind?",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/rlwdxCC907Y",
        videoDuration: "2:33",
        orderIndex: 1,
        status: "published",
      },
      {
        id: "2",
        moduleId: "1",
        title: "Narzędzia",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/rlwdxCC907Y",
        videoDuration: "0:41",
        orderIndex: 2,
        status: "published",
      },
      {
        id: "3",
        moduleId: "1",
        title: "Instalacja Tailwind",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/rlwdxCC907Y",
        videoDuration: "1:20",
        orderIndex: 3,
        status: "published",
      },
    ],
  },
  {
    id: "2",
    title: "Poznaj Tailwind",
    orderIndex: 2,
    status: "published",
    lessons: [
      {
        id: "4",
        moduleId: "2",
        title: "Kontenery i breakpointy",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/OViC3hOylVs",
        videoDuration: "5:27",
        orderIndex: 1,
        status: "published",
      },
      {
        id: "5",
        moduleId: "2",
        title: "Kolumny",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/OViC3hOylVs",
        videoDuration: "1:55",
        orderIndex: 2,
        status: "published",
      },
      {
        id: "6",
        moduleId: "2",
        title: "Kolory",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/OViC3hOylVs",
        videoDuration: "2:54",
        orderIndex: 3,
        status: "published",
      },
    ],
  },
  {
    id: "3",
    title: "Konfiguracja kolorów",
    orderIndex: 3,
    status: "published",
    lessons: [
      {
        id: "7",
        moduleId: "3",
        title: "Konfiguracja kolorów cz. 1",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/UBOj6rqRUME",
        videoDuration: "3:49",
        orderIndex: 1,
        status: "published",
      },
      {
        id: "8",
        moduleId: "3",
        title: "Konfiguracja kolorów cz. 2",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/UBOj6rqRUME",
        videoDuration: "3:14",
        orderIndex: 2,
        status: "published",
      },
    ],
  },
  {
    id: "4",
    title: "Margin & padding",
    orderIndex: 4,
    status: "published",
    lessons: [
      {
        id: "9",
        moduleId: "4",
        title: "Margin & padding",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/UBOj6rqRUME",
        videoDuration: "4:27",
        orderIndex: 1,
        status: "published",
      },
    ],
  },
  {
    id: "5",
    title: "Width & height",
    orderIndex: 5,
    status: "published",
    lessons: [
      {
        id: "10",
        moduleId: "5",
        title: "Width & height",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/UBOj6rqRUME",
        videoDuration: "4:09",
        orderIndex: 1,
        status: "published",
      },
    ],
  },
  {
    id: "6",
    title: "Display & visibility",
    orderIndex: 6,
    status: "published",
    lessons: [
      {
        id: "11",
        moduleId: "6",
        title: "Display & visibility",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/UBOj6rqRUME",
        videoDuration: "0:54",
        orderIndex: 1,
        status: "published",
      },
    ],
  },
];
