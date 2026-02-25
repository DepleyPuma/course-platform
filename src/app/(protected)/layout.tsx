import React, { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import { getUser } from "@/utils/actions";

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
    <div className="min-h-screen bg-white">
      <Navigation firstname={firstname} isAdmin={isAdmin} />
      {children}
    </div>
  );
}
