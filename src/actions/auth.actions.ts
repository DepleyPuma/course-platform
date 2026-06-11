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
