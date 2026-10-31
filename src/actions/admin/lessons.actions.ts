"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import {
  getStoragePathFromPublicUrl,
  LESSONS_MATERIALS_BUCKET,
} from "@/utils/storage";
import { ActionResult, FormState, Lesson } from "@/utils/types";
import { requireAdmin } from "../users.actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getModuleLessonsAdmin(
  moduleId: string,
): Promise<ActionResult<Lesson[]>> {
  try {
    const result = await requireAdmin();

    if (!result.success) {
      return { success: false, error: result.error };
    }

    const supabase = await createServerSupabase();

    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("module_id", moduleId)
      .order("order_index");

    if (error) {
      return { success: false, error: "Nie udało się pobrać listy lekcji" };
    }

    return { success: true, data: (data as Lesson[]) ?? [] };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function getLessonByIdAdmin(
  id: string,
): Promise<ActionResult<Lesson>> {
  try {
    const result = await requireAdmin();

    if (!result.success) {
      return { success: false, error: result.error };
    }

    const supabase = await createServerSupabase();

    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return { success: false, error: "Nie udało się pobrać lekcji" };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

type SupabaseClient = Awaited<ReturnType<typeof createServerSupabase>>;

async function removeStoredPdf(supabase: SupabaseClient, path: string | null) {
  if (!path) return;

  const { error } = await supabase.storage
    .from(LESSONS_MATERIALS_BUCKET)
    .remove([path]);

  if (error) {
    console.error(`Nie udało się usunąć pliku ${path}:`, error.message);
  }
}

function parseLessonPayload(formData: FormData) {
  const type = formData.get("type") as Lesson["type"];

  return {
    title: formData.get("title"),
    type,
    status: formData.get("status") as Lesson["status"],
    description: formData.get("description") || null,
    video_url: type === "video" ? formData.get("video_url") : null,
    pdf_url: type === "pdf" ? formData.get("pdf_url") : null,
    text_content: type === "text" ? formData.get("text_content") : null,
  };
}

export async function addLessonAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const moduleId = String(formData.get("moduleId") ?? "");
  const payload = parseLessonPayload(formData);
  const uploadedPdfPath = String(formData.get("pdf_path") ?? "") || null;

  if (payload.type === "pdf" && !payload.pdf_url) {
    return { success: false, error: "Wybierz plik PDF" };
  }

  try {
    const result = await requireAdmin();

    if (!result.success) {
      return { success: false, error: result.error };
    }

    const supabase = await createServerSupabase();

    const { count, error: countError } = await supabase
      .from("lessons")
      .select("id", { count: "exact", head: true })
      .eq("module_id", moduleId);

    if (countError) {
      await removeStoredPdf(supabase, uploadedPdfPath);
      return { success: false, error: "Nie udało się dodać lekcji" };
    }

    const { error } = await supabase.from("lessons").insert({
      ...payload,
      module_id: moduleId,
      order_index: (count ?? 0) + 1,
    });

    if (error) {
      await removeStoredPdf(supabase, uploadedPdfPath);
      return { success: false, error: "Nie udało się dodać lekcji" };
    }

    revalidatePath(`/admin/modules/${moduleId}`);
    revalidatePath("/admin/modules");
  } catch (error) {
    return { success: false, error: String(error) };
  }

  redirect(`/admin/modules/${moduleId}`);
}

export async function updateLessonAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const moduleId = String(formData.get("moduleId") ?? "");
  const id = String(formData.get("id") ?? "");
  const payload = parseLessonPayload(formData);
  const uploadedPdfPath = String(formData.get("pdf_path") ?? "") || null;

  if (payload.type === "pdf" && !payload.pdf_url) {
    return { success: false, error: "Wybierz plik PDF" };
  }

  try {
    const result = await requireAdmin();

    if (!result.success) {
      return { success: false, error: result.error };
    }

    const supabase = await createServerSupabase();

    const { data: currentLesson } = await supabase
      .from("lessons")
      .select("pdf_url")
      .eq("id", id)
      .single();

    const { error } = await supabase
      .from("lessons")
      .update(payload)
      .eq("id", id);

    if (error) {
      await removeStoredPdf(supabase, uploadedPdfPath);
      return { success: false, error: "Nie udało się zaktualizować lekcji" };
    }

    const previousPdfPath = currentLesson?.pdf_url
      ? getStoragePathFromPublicUrl(currentLesson.pdf_url)
      : null;
    const newPdfPath = payload.pdf_url
      ? getStoragePathFromPublicUrl(String(payload.pdf_url))
      : null;

    if (previousPdfPath && previousPdfPath !== newPdfPath) {
      await removeStoredPdf(supabase, previousPdfPath);
    }

    revalidatePath(`/admin/modules/${moduleId}`);
    revalidatePath("/admin/modules");
  } catch (error) {
    return { success: false, error: String(error) };
  }

  redirect(`/admin/modules/${moduleId}`);
}

export async function updateLessonsOrder(
  lessons: Lesson[],
  moduleId: string,
): Promise<ActionResult<void>> {
  try {
    const result = await requireAdmin();

    if (!result.success) {
      return { success: false, error: result.error };
    }

    const supabase = await createServerSupabase();
    const { error } = await supabase.from("lessons").upsert(
      lessons.map((lesson) => ({
        id: lesson.id,
        module_id: moduleId,
        title: lesson.title,
        type: lesson.type,
        status: lesson.status,
        order_index: lesson.order_index,
      })),
    );

    if (error) {
      return {
        success: false,
        error: "Nie udało się zaktualizować kolejności lekcji",
      };
    }

    revalidatePath(`/admin/modules/${moduleId}`);
    revalidatePath("/admin/modules");

    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function deleteLesson(
  id: string,
  moduleId: string,
): Promise<ActionResult<void>> {
  try {
    const result = await requireAdmin();

    if (!result.success) {
      return { success: false, error: result.error };
    }

    const supabase = await createServerSupabase();
    const { error } = await supabase.from("lessons").delete().eq("id", id);

    if (error) {
      return { success: false, error: "Nie udało się usunąć lekcji" };
    }

    revalidatePath(`/admin/modules/${moduleId}`);
    revalidatePath("/admin/modules");

    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
