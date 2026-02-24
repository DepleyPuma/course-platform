import React, { ReactNode } from "react";
import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navigation from "@/components/Navigation";
import { getAuthUser } from "@/utils/actions";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createServerSupabase();

  const user = await getAuthUser();

  const {
    data: { firstname, role },
  } = await supabase.from("users").select("*").eq("id", user.id).single();

  return (
    <div className="min-h-screen bg-white">
      <Navigation firstname={firstname} isAdmin={role === "admin"} />
      {children}
    </div>
  );
}
