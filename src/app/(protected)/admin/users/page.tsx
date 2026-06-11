import { UsersSection } from "@/components/settings/UsersSection";
import { getAllUsers } from "@/actions";
import React from "react";

async function UsersPage() {
  const results = await getAllUsers();

  if (!results.success) {
    return (
      <p className="p-4 text-xl text-red-500">
        Nie udało się pobrać użytkowników
      </p>
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
