import React, { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import { getUser } from "@/actions";
import { Toaster } from "@/components/ui/sonner";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const result = await getUser();

  if (!result.success) {
    console.log(result.error);
    return;
  }

  const {
    data: { firstname, role },
  } = result;

  const isAdmin = role === "admin";

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <Navigation firstname={firstname} isAdmin={isAdmin} />
      {children}
      <Toaster />
    </div>
  );
}
