import React, { ReactNode } from "react";
import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navigation from "@/components/Navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // TO-DO create database
  //   const {
  //     data: { role },
  //   } = await supabase.from("users").select("role").eq("id", user.id);

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* isAdmin={role === "admin"} */}
      <Navigation />
      {children}
    </div>
  );
}
