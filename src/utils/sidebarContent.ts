import { BookOpen, LayoutDashboard, Settings, Users } from "lucide-react";

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
    title: "Podstawy służby w OSP",
    orderIndex: 1,
    status: "published",
    lessons: [
      {
        id: "1",
        moduleId: "1",
        title: "Rola strażaka OSP",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/rlwdxCC907Y",
        videoDuration: "2:33",
        orderIndex: 1,
        status: "published",
      },
      {
        id: "2",
        moduleId: "1",
        title: "Podstawowe wyposażenie osobiste",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/rlwdxCC907Y",
        videoDuration: "0:41",
        orderIndex: 2,
        status: "published",
      },
      {
        id: "3",
        moduleId: "1",
        title: "Przygotowanie do wyjazdu alarmowego",
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
    title: "Podstawy działań gaśniczych",
    orderIndex: 2,
    status: "published",
    lessons: [
      {
        id: "4",
        moduleId: "2",
        title: "Zasady bezpieczeństwa na miejscu akcji",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/OViC3hOylVs",
        videoDuration: "5:27",
        orderIndex: 1,
        status: "published",
      },
      {
        id: "5",
        moduleId: "2",
        title: "Budowa i obsługa linii gaśniczej",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/OViC3hOylVs",
        videoDuration: "1:55",
        orderIndex: 2,
        status: "published",
      },
      {
        id: "6",
        moduleId: "2",
        title: "Rodzaje pożarów i środki gaśnicze",
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
    title: "Łączność i koordynacja działań",
    orderIndex: 3,
    status: "published",
    lessons: [
      {
        id: "7",
        moduleId: "3",
        title: "Łączność radiowa - podstawy",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/UBOj6rqRUME",
        videoDuration: "3:49",
        orderIndex: 1,
        status: "published",
      },
      {
        id: "8",
        moduleId: "3",
        title: "Łączność radiowa - komunikaty praktyczne",
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
    title: "Ratownictwo techniczne",
    orderIndex: 4,
    status: "published",
    lessons: [
      {
        id: "9",
        moduleId: "4",
        title: "Sprzęt hydrauliczny i ratownictwo techniczne",
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
    title: "Kwalifikowana pierwsza pomoc",
    orderIndex: 5,
    status: "published",
    lessons: [
      {
        id: "10",
        moduleId: "5",
        title: "Pierwsza pomoc w działaniach OSP",
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
    title: "Działania nocne i ograniczona widoczność",
    orderIndex: 6,
    status: "published",
    lessons: [
      {
        id: "11",
        moduleId: "6",
        title: "Organizacja działań podczas akcji nocnej",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/UBOj6rqRUME",
        videoDuration: "0:54",
        orderIndex: 1,
        status: "published",
      },
    ],
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
