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
    console.log(error.message);
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
        error: `Błąd podczas aktualizacji profilu użytkownika`,
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
