"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ActionResult, FormState, User } from "@/utils/types";
import { isRedirectError } from "next/dist/client/components/redirect-error";

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

export async function login(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await createServerSupabase();

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  // const rememberMe = formData.get("rememberMe") === "on"; // return null or on

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

export async function logut() {
  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`Logut failed: ${error.message}`);
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
    return {
      success: false,
      error: error,
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
      error: error,
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
    const currentPassword = String(formData.get("currentPassword"));
    const newPassword = String(formData.get("newPassword"));
    const confirmNewPassword = String(formData.get("confirmNewPassword"));

    if (!currentPassword || currentPassword.length === 0) {
      return {
        success: false,
        error: "Musisz podać obecne hasło",
      };
    }

    if (!newPassword || currentPassword.length === 0) {
      return {
        success: false,
        error: "Musisz podać nowe hasło",
      };
    }

    if (
      !confirmNewPassword ||
      currentPassword.length === 0 ||
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
