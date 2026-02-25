export type LoginState =
  | {
      success?: boolean;
      error?: string;
    }
  | null
  | undefined;

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string | unknown };

export type User = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: "user" | "admin";
  additional_roles: ("kierowca" | "dowódca")[];
  created_at: string;
};
