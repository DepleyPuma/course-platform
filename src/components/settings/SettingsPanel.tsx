"use client";

import { ChangePasswordSection } from "@/components/settings/ChangePasswordSection";
import { UserProfileSection } from "@/components/settings/UserProfileSection";
import { User as UserType } from "@/utils/types";
import { useState } from "react";
import { ProgressSection } from "./ProgressSection";

type SettingsPanelProps = {
  userFromSupabase: UserType;
};

export function SettingsPanel({ userFromSupabase }: SettingsPanelProps) {
  const [user, setUser] = useState(userFromSupabase);

  return (
    <main className="flex-1 overflow-y-scroll">
      <div className="mx-auto max-w-4xl space-y-8 p-4 md:p-8">
        <h1 className="mb-6 text-4xl font-bold">Ustawienia</h1>
        <UserProfileSection user={user} setUser={setUser} />
        <ChangePasswordSection />
        <ProgressSection /> {/* My progress section - TO-DO */}
      </div>
    </main>
  );
}
