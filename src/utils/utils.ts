import { BookOpen, CheckCircle2, UsersIcon, Video } from "lucide-react";
import { Card } from "@/utils/types";

export const statCards: Card[] = [
  {
    key: "modules_count",
    icon: BookOpen,
    label: "Moduły",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    showPercent: false,
  },
  {
    key: "lessons_count",
    icon: Video,
    label: "Lekcje",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    showPercent: false,
  },
  {
    key: "users_count",
    icon: UsersIcon,
    label: "Strażacy",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    showPercent: false,
  },
  {
    key: "completed_percent",
    label: "Ukończone",
    icon: CheckCircle2,
    bgColor: "bg-[#F0F4E8]",
    iconColor: "text-[#BBCB2E]",
    showPercent: true,
  },
];
