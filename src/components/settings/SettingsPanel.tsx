"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormState, User as UserType } from "@/utils/types";
import { BarChart3, ChevronLeft, Lock, Menu, User } from "lucide-react";
import React, { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { updateMyProfile } from "@/utils/actions";
import { toast } from "sonner";

type SettingsPanelProps = {
  userFromSupabase: UserType;
};

const initialState: FormState = {};

export function SettingsPanel({ userFromSupabase }: SettingsPanelProps) {
  const [user, setUser] = useState(userFromSupabase);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [newFirstname, setNewFirstname] = useState(user.firstname);
  const [newLastname, setNewLastname] = useState(user.lastname);

  const [updateUserDataState, updateUserAction, isUpdateUserPending] =
    useActionState(updateMyProfile, initialState);

  const setAdditionalRoles = () => {
    if (user.additional_roles.length > 0) {
      return user.additional_roles.join(" ");
    } else {
      return "Brak dodatkowych ról";
    }
  };

  const updateUserData = () => {
    setUser((prevState) => ({
      ...prevState,
      firstname: newFirstname,
      lastname: newLastname,
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (updateUserDataState?.success === undefined) return;

    if (updateUserDataState?.success) {
      toast.success("Dane zostały zaktualizowane", {
        position: "bottom-right",
      });
    } else {
      toast.error(updateUserDataState?.error, {
        position: "bottom-right",
      });
    }
  }, [updateUserDataState]);

  return (
    <div className="flex flex-1 overflow-hidden">
      <div
        className={`no-scrollbar relative flex h-[calc(100vh-85px)] overflow-y-scroll bg-gray-300 transition-all duration-300 ${isSidebarOpen ? "w-1/6" : "w-0"}`}
      >
        Sidebar
      </div>

      <main className="flex-1 overflow-y-scroll">
        <div className="sticky top-0 z-30 border-b border-gray-200 bg-white p-4">
          <Button
            onClick={toggleSidebar}
            type="button"
            variant="ghost"
            className="cursor-pointer rounded-lg p-2 py-5 transition-colors hover:bg-gray-100"
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        <div className="mx-auto max-w-4xl space-y-8 p-4 md:p-8">
          <h1 className="mb-6 text-4xl font-bold">Ustawienia</h1>

          {/* Profile section */}
          <section>
            <aside className="mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-bold">Profil</h2>
            </aside>

            <form
              action={updateUserAction}
              className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 md:gap-5"
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="firstname">Imię</Label>
                  <Input
                    defaultValue={user.firstname}
                    type="text"
                    name="firstname"
                    id="firstname"
                    onChange={(e) => setNewFirstname(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="lastname">Nazwisko</Label>
                  <Input
                    defaultValue={user.lastname}
                    type="text"
                    name="lastname"
                    id="lastname"
                    onChange={(e) => setNewLastname(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Label className="flex flex-col items-start">Email</Label>
                <Input
                  defaultValue={user.email}
                  type="text"
                  name="email"
                  id="email"
                  disabled
                  className="cursor-not-allowed border-0 bg-gray-100"
                />
                <p className="pt-2 text-sm text-gray-500">
                  Email może zmienić tylko administrator
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Label className="flex flex-col items-start">
                  Rola dodatkowa
                </Label>
                <Input
                  defaultValue={setAdditionalRoles()}
                  type="text"
                  name="additional_roles"
                  id="additional_roles"
                  disabled
                  className="cursor-not-allowed border-0 bg-gray-100"
                />
                <p className="pt-2 text-sm text-gray-500">
                  Rolę może zmienić tylko administrator
                </p>
              </div>

              <Button
                onClick={updateUserData}
                type="submit"
                className="cursor-pointer self-end bg-(--second-color) text-black hover:bg-(--second-color-hover)"
              >
                {isUpdateUserPending ? "Zapisuje zmiany..." : "Zapisz zmiany"}
              </Button>
            </form>
          </section>

          {/* Restart password section */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-bold">Bezpieczeństwo</h2>
            </div>

            <form
              action=""
              className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 md:gap-5"
            >
              <div className="flex flex-col gap-3">
                <Label className="flex flex-col items-start">
                  Obecne hasło
                </Label>
                <Input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  placeholder="••••••••••••"
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label className="flex flex-col items-start">Nowe hasło</Label>
                <Input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="Minimum 8 znaków"
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label className="flex flex-col items-start">
                  Powtórz nowe hasło
                </Label>
                <Input
                  type="password"
                  name="confirmNewPassword"
                  id="confirmNewPassword"
                  placeholder="Powtórz hasło"
                />
              </div>

              <Button
                type="submit"
                className="cursor-pointer self-end bg-(--second-color) text-black hover:bg-(--second-color-hover)"
              >
                Resetuj hasło
              </Button>
            </form>
          </section>

          {/* My progress section - TO-DO */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-bold">Mój postęp</h2>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 md:gap-5">
              <h2>Your progress will be displayed here</h2>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
