"use server";

import { getAuthUser } from "@/actions/auth.actions";
import { createServerSupabase } from "@/lib/supabase/server";
import { ActionResult } from "@/utils/types";

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
