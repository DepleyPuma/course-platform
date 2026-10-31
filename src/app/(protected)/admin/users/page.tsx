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
    <div>
      <h1 className="mb-8 text-3xl font-bold">Użytkownicy</h1>
      <UsersSection users={users} />
    </div>
  );
}

export default UsersPage;
