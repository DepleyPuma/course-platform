"use server";

import { getAuthUser } from "@/actions/auth.actions";
import { createServerSupabase } from "@/lib/supabase/server";
import { ActionResult, FormState, Lesson, Module } from "@/utils/types";
import { revalidatePath } from "next/cache";

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
          type,
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
