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
};
