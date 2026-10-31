"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { ActionResult } from "@/utils/types";
import { requireAdmin } from "../users.actions";

export const getDashboardData = async (): Promise<
  ActionResult<Record<string, number>>
> => {
  try {
    const result = await requireAdmin();
    const supabase = await createServerSupabase();

    if (!result.success) {
      return { success: false, error: result.error };
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
