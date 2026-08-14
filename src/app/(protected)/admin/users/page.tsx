import { UsersSection } from "@/components/settings/UsersSection";
import { ErrorMessage } from "@/components/ui/error-message";
import { getAllUsers } from "@/actions";
import React from "react";

async function UsersPage() {
  const results = await getAllUsers();

  if (!results.success) {
    return (
      <ErrorMessage className="text-xl">
        Nie udało się pobrać użytkowników
      </ErrorMessage>
    );
  }

  const users = results.data;

  return (
    <div className="mx-auto max-w-7xl flex-1 px-4 pt-18">
      <UsersSection users={users} />
    </div>
  );
}

export default UsersPage;
