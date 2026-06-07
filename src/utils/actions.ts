"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { ActionResult, FormState, User } from "@/utils/types";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { Lesson, Module } from "@/utils/types";
import { revalidatePath } from "next/cache";

export const getAuthUser = async () => {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return user;
};

export async function sendResetPasswordLink(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await createServerSupabase();
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { success: false, error: "Email nie może być pusty" };
  }

  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`,
  });

  return { success: true };
}

export const resetPassword = async (
  email: string,
): Promise<ActionResult<void>> => {
  try {
    const supabase = await createServerSupabase();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
        message: "Błąd podczas resetowania hasła",
      };
    }

    return { success: true, data: undefined };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      error: String(error),
      message: "Błąd podczas resetowania hasła",
    };
  }
};

export async function login(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await createServerSupabase();

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!email || !password) {
    return { success: false, error: "Email i hasło są wymagane" };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: "Nieprawidłowy email lub hasło" };
  }

  redirect("/home");
}

export async function logout() {
  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`Logout failed: ${error.message}`);
  }

  if (isRedirectError(error)) {
    throw error;
  }

  redirect("/login");
}

export const getUser = async (userId?: string): Promise<ActionResult<User>> => {
  try {
    const user = await getAuthUser();
    const supabase = await createServerSupabase();
    const { error, data } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId ? userId : user.id)
      .maybeSingle();

    if (error) {
      return {
        success: false,
        error: "Nie udało się znaleść użytkownika",
      };
    }

    return { success: true, data };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      error: String(error),
    };
  }
};

export const getAllUsers = async (): Promise<ActionResult<User[]>> => {
  try {
    const user = await getAuthUser();
    const supabse = await createServerSupabase();

    if (!user) {
      return { success: false, error: "Nie jesteś zalogowany" };
    }

    const { error, data } = await supabse.from("users").select("*");

    if (error) {
      return {
        success: false,
        error: "Nie udało się pobrać listy użytkowników",
      };
    }

    return { success: true, data: data ?? [] };
  } catch (error) {
    return {
      success: false,
      error: String(error),
    };
  }
};

export const updateMyProfile = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const user = await getAuthUser();
    const supabase = await createServerSupabase();

    const firstname = String(formData.get("firstname") ?? "");
    const lastname = String(formData.get("lastname") ?? "");

    if (!firstname || !lastname) {
      return {
        success: false,
        error: "Imię i Nazwisko nie mogą być puste",
      };
    }

    const { error } = await supabase
      .from("users")
      .update({ firstname, lastname })
      .eq("id", user.id);

    if (error) {
      return {
        success: false,
        error: "Błąd podczas aktualizacji profilu użytkownika",
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: String(error),
    };
  }
};

export const changePassword = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const supabase = await createServerSupabase();
    const currentPassword = String(
      formData.get("currentPassword") ?? "",
    ).trim();
    const newPassword = String(formData.get("newPassword") ?? "").trim();
    const confirmNewPassword = String(
      formData.get("confirmNewPassword") ?? "",
    ).trim();

    if (!currentPassword || currentPassword.length === 0) {
      return {
        success: false,
        error: "Musisz podać obecne hasło",
      };
    }

    if (!newPassword || newPassword.length === 0) {
      return {
        success: false,
        error: "Musisz podać nowe hasło",
      };
    }

    if (
      !confirmNewPassword ||
      confirmNewPassword.length === 0 ||
      confirmNewPassword !== newPassword
    ) {
      return {
        success: false,
        error: "Powtórzone hasło nie zgadza się z nowym hasłem",
      };
    }

    const { data, error } = await supabase.rpc("change_user_password", {
      current_password: currentPassword,
      new_password: newPassword,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    if (!data.success) {
      return {
        success: false,
        error: data.error,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
    };
  }
};

export const getAllModules = async (): Promise<ActionResult<Module[]>> => {
  try {
    const user = await getAuthUser();
    const supabase = await createServerSupabase();

    if (!user) {
      return { success: false, error: "Nie jesteś zalogowany" };
    }

    const { error, data } = await supabase
      .from("modules")
      .select(
        `
        id,
        title,
        order_index,
        status,
        lessons (
          id,
          title,
          order_index,
          video_duration
        )
      `,
      )
      .eq("status", "published")
      .order("order_index")
      .order("order_index", { referencedTable: "lessons" });

    if (error) {
      return { success: false, error: "Nie udało się pobrać listy modułów" };
    }

    return { success: true, data: data as Module[] };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const getLessonById = async (
  id: string,
): Promise<ActionResult<Lesson>> => {
  try {
    const user = await getAuthUser();
    const supabase = await createServerSupabase();

    if (!user) {
      return { success: false, error: "Nie jesteś zalogowany" };
    }

    const { error, data } = await supabase
      .from("lessons")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return { success: false, error: "Nie udało się pobrać lekcji" };
    }

    return { success: true, data: data as Lesson };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const getDashboardData = async (): Promise<
  ActionResult<Record<string, number>>
> => {
  try {
    const user = await getAuthUser();
    const supabase = await createServerSupabase();

    if (!user) {
      return { success: false, error: "Nie jesteś zalogowany" };
    }

    const { data, error } = await supabase.rpc("get_dashboard_counts").single();

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      data: data as Record<string, number>,
    };
  } catch (error) {
    return {
      success: false,
      error: `Błąd podczas pobierania danych do dashboardu: ${error}`,
    };
  }
};

export const completeLesson = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const user = await getAuthUser();
    const supabase = await createServerSupabase();

    if (!user) {
      return { success: false, error: "Nie jesteś zalogowany" };
    }

    const lessonId = String(formData.get("lessonId"));

    if (!lessonId) {
      return { success: false, error: "Brak ID lekcji" };
    }

    const { error } = await supabase.from("user_progress").upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        completed: true,
      },
      { onConflict: "user_id,lesson_id" },
    );

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/course", "layout");

    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const getCompletedLessons = async (): Promise<
  ActionResult<string[]>
> => {
  try {
    const user = await getAuthUser();
    const supabase = await createServerSupabase();

    if (!user) {
      return { success: false, error: "Nie jesteś zalogowany" };
    }

    const { data, error } = await supabase
      .from("user_progress")
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("completed", true);

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      data: data.map((l) => l.lesson_id),
    };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const getUserProgress = async (
  userId: string,
): Promise<
  ActionResult<{ completedLessons: number; totalLessons: number }>
> => {
  try {
    const user = await getAuthUser();
    const supabase = await createServerSupabase();

    if (!user) {
      return { success: false, error: "Nie jesteś zalogowany" };
    }

    const [completed, total] = await Promise.all([
      supabase
        .from("user_progress")
        .select("id", { count: "exact" })
        .eq("user_id", userId)
        .eq("completed", true),
      supabase
        .from("lessons")
        .select("id", { count: "exact" })
        .eq("status", "published"),
    ]);

    if (completed.error || total.error) {
      return {
        success: false,
        error:
          completed.error?.message ||
          total.error?.message ||
          "Błąd podczas pobierania danych o postępie",
      };
    }

    return {
      success: true,
      data: {
        completedLessons: completed.count ?? 0,
        totalLessons: total.count ?? 0,
      },
    };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const goBackToFirstLesson = async (): Promise<
  ActionResult<string | null>
> => {
  try {
    const user = await getAuthUser();

    if (!user) {
      return { success: false, error: "Nie jesteś zalogowany" };
    }

    const allModules = await getAllModules();

    if (!allModules.success) {
      return {
        success: false,
        error: "Nie udało się pobrać wszyskich modułów",
      };
    }

    const href = allModules.data[0]?.lessons?.[0]
      ? `/course/${allModules.data[0].id}/${allModules.data[0].lessons[0].id}`
      : null;

    return {
      success: true,
      data: href,
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
    };
  }
};
