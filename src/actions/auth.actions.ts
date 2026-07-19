"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { ActionResult, FormState } from "@/utils/types";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

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

  redirect("/login");
}

export async function completeProfile(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await getAuthUser();
    console.log("user", user);

    const supabase = await createServerSupabase();

    const firstname = String(formData.get("firstname") ?? "").trim();
    const lastname = String(formData.get("lastname") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();
    const confirmPassword = String(
      formData.get("confirmPassword") ?? "",
    ).trim();

    if (!firstname || !lastname) {
      return { success: false, error: "Imię i nazwisko są wymagane" };
    }

    if (!password || !confirmPassword) {
      return {
        success: false,
        error: "Hasło i powtórzenie hasła są wymagane",
      };
    }

    if (password.length < 8) {
      return {
        success: false,
        error: "Hasło musi składać się z minimum 8 znaków",
      };
    }

    if (password !== confirmPassword) {
      return { success: false, error: "Hasła nie są identyczne" };
    }

    const { error } = await supabase
      .from("users")
      .update({
        firstname,
        lastname,
      })
      .eq("id", user.id);

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    const { error: passwordError } = await supabase.auth.updateUser({
      password: password,
    });

    if (passwordError) {
      return {
        success: false,
        error: passwordError.message,
      };
    }

    return { success: true };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      error: String(error),
    };
  }
}
