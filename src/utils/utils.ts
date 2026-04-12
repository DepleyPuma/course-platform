import { BookOpen, CheckCircle2, UsersIcon, Video } from "lucide-react";
import { Card } from "./types";

export const statCards: Card[] = [
  {
    icon: BookOpen,
    label: "Moduły",
    value: 5,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Video,
    label: "Lekcje",
    value: 44,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: UsersIcon,
    label: "Strażacy",
    value: 2,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: CheckCircle2,
    label: "Ukończone",
    value: `${25}%`,
    bgColor: "bg-[#F0F4E8]",
    iconColor: "text-[#BBCB2E]",
  },
];
