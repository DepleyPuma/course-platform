"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { ActionResult, Module } from "@/utils/types";
import { requireAdmin } from "../users.actions";
import { revalidatePath } from "next/cache";

export async function getAllModulesAdmin(): Promise<ActionResult<Module[]>> {
  try {
    const result = await requireAdmin();

    if (!result.success) {
      return { success: false, error: result.error };
    }

    const supabase = await createServerSupabase();

    const { data, error } = await supabase
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
      .order("order_index")
      .order("order_index", { referencedTable: "lessons" });

    if (error) {
      return { success: false, error: "Nie udało się pobrać listy modułów" };
    }

    return { success: true, data: (data as Module[]) ?? [] };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function getModuleByIdAdmin(
  id: string,
): Promise<ActionResult<Module>> {
  try {
    const result = await requireAdmin();

    if (!result.success) {
      return { success: false, error: result.error };
    }

    const supabase = await createServerSupabase();

    const { data, error } = await supabase
      .from("modules")
      .select("id, title, order_index, status")
      .eq("id", id)
      .single();

    if (error) {
      return { success: false, error: "Nie udało się pobrać modułu" };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function addModule(
  module: Pick<Module, "title" | "status">,
): Promise<ActionResult<Module>> {
  try {
    const result = await requireAdmin();

    if (!result.success) {
      return { success: false, error: result.error };
    }

    const supabase = await createServerSupabase();

    const { count, error: countError } = await supabase
      .from("modules")
      .select("id", { count: "exact", head: true });

    if (countError) {
      return { success: false, error: "Nie udało się dodać modułu" };
    }

    const { data, error } = await supabase
      .from("modules")
      .insert({
        title: module.title,
        status: module.status,
        order_index: (count ?? 0) + 1,
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: "Nie udało się dodać modułu" };
    }

    revalidatePath("/admin/modules");

    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function updateModule(
  module: Pick<Module, "id" | "title" | "status">,
): Promise<ActionResult<Module>> {
  try {
    const result = await requireAdmin();

    if (!result.success) {
      return { success: false, error: result.error };
    }

    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("modules")
      .update(module)
      .eq("id", module.id)
      .select()
      .single();

    if (error) {
      return { success: false, error: "Nie udało się zaktualizować modułu" };
    }

    revalidatePath("/admin/modules");

    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function deleteModule(id: string): Promise<ActionResult<void>> {
  try {
    const result = await requireAdmin();

    if (!result.success) {
      return { success: false, error: result.error };
    }

    const supabase = await createServerSupabase();
    const { error } = await supabase.from("modules").delete().eq("id", id);

    if (error) {
      return { success: false, error: "Nie udało się usunąć modułu" };
    }

    revalidatePath("/admin/modules");

    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function updateModulesOrder(
  modules: Module[],
): Promise<ActionResult<void>> {
  try {
    const result = await requireAdmin();

    if (!result.success) {
      return { success: false, error: result.error };
    }

    const supabase = await createServerSupabase();
    const { error } = await supabase.from("modules").upsert(
      modules.map((module) => ({
        id: module.id,
        title: module.title,
        status: module.status,
        order_index: module.order_index,
      })),
    );

    if (error) {
      console.error(error);
      return {
        success: false,
        error: "Nie udało się zaktualizować kolejności modułów",
      };
    }

    revalidatePath("/admin/modules");

    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
