"use server";

import { getAuthUser } from "@/actions/auth.actions";
import { createServerSupabase } from "@/lib/supabase/server";
import { ActionResult, FormState, User } from "@/utils/types";
import { isRedirectError } from "next/dist/client/components/redirect-error";

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
