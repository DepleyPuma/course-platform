import { AlignLeft, FileText, LucideIcon, Video } from "lucide-react";
import { Lesson } from "@/utils/types";

export const LESSON_TYPE_DISPLAY: Record<
  Lesson["type"],
  { icon: LucideIcon; label: string; bg: string; color: string }
> = {
  video: {
    icon: Video,
    label: "wideo",
    bg: "bg-purple-50",
    color: "text-purple-600",
  },
  pdf: {
    icon: FileText,
    label: "PDF",
    bg: "bg-red-50",
    color: "text-red-600",
  },
  text: {
    icon: AlignLeft,
    label: "tekst",
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
};
