import { LucideIcon } from "lucide-react";

export type FormState =
  | {
      success?: boolean;
      error?: string;
    }
  | null
  | undefined;

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; message?: string };

export type User = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: "user" | "admin";
  additional_roles: ("kierowca" | "dowódca")[];
  created_at: string;
};

export type Card = {
  key: string;
  icon: LucideIcon;
  label: string;
  bgColor: string;
  iconColor: string;
  showPercent: boolean;
};

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
