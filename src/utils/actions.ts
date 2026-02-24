"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LoginState } from "@/utils/types";

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
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const supabase = await createServerSupabase();

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  // const rememberMe = formData.get("rememberMe") === "on"; // return null or on

  // console.log(rememberMe);

  if (!email || !password) {
    return { error: "Email i hasło są wymagane" };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Nieprawidłowy email lub hasło" };
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
