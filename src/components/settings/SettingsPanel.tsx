"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User as UserType } from "@/utils/types";
import { Lock, User } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type SettingsPanelProps = {
  userFromSupabase: UserType;
};

export function SettingsPanel({ userFromSupabase }: SettingsPanelProps) {
  const [user, setUser] = useState(userFromSupabase);

  const setAdditionalRoles = () => {
    if (user.additional_roles.length > 0) {
      return user.additional_roles.join(" ");
    } else {
      return "Brak dodatkowych ról";
    }
  };
  return (
    <div className="flex flex-1">
      <div className="relative flex h-[calc(100vh-85px)] w-1/6 bg-gray-300">
        Sidebar
      </div>
      <div className="mx-auto max-w-4xl flex-1 p-4 space-y-8 md:p-8">
        <h1 className="mb-6 text-4xl font-bold">Ustawienia</h1>
        <section>
          <div className="mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-gray-600" />
            <h2 className="text-xl font-bold">Profil</h2>
          </div>
          <form
            action=""
            className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 md:gap-5"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
             <div className="flex flex-col gap-3">
               <Label
                htmlFor="firstname"
              >
                Imię
              </Label>
              <Input
                  defaultValue={user.firstname}
                  type="text"
                  name="firstname"
                  id="firstname"
                />
             </div>
              <div className="flex flex-col gap-3">
                <Label
                htmlFor="lastname"
              >
                Nazwisko
              </Label>
              <Input
                  defaultValue={user.lastname}
                  type="text"
                  name="lastname"
                  id="lastname"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label className="flex flex-col items-start">
              Email
            </Label>
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
              type="submit"
              className="cursor-pointer self-end bg-(--second-color) text-black hover:bg-(--second-color-hover)"
            >
              Zapisz zmiany
            </Button>
          </form>
        </section>

         <section>
          <div className="mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-gray-600" />
            <h2 className="text-xl font-bold">Resetuje hasło</h2>
          </div>
          <form
            action=""
            className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 md:gap-5"
          >
            <Label className="flex flex-col items-start">
              Email
              <Input
                defaultValue={user.email}
                type="text"
                name="email"
                id="email"
                disabled
                className="cursor-not-allowed border-0 bg-gray-100"
              />
            </Label>
            <p className="text-sm text-gray-500">
              Email może zmienić tylko administrator
            </p>
            <Label className="flex flex-col items-start">
              Rola dodatkowa
              <Input
                defaultValue={setAdditionalRoles()}
                type="text"
                name="additional_roles"
                id="additional_roles"
                disabled
                className="cursor-not-allowed border-0 bg-gray-100"
              />
            </Label>
            <p className="text-sm text-gray-500">
              Rolę może zmienić tylko administrator
            </p>
            <Button
              type="submit"
              className="cursor-pointer self-end bg-(--second-color) text-black hover:bg-(--second-color-hover)"
            >
              Resetuj hasło
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
