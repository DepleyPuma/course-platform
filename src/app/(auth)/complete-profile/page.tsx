"use client";

import InputPassword from "@/components/auth/update-password/InputPassword";
import { Logo } from "@/components/ui/logo";
import React, { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { completeProfile } from "@/actions";
import { FormState } from "@/utils/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const initialState: FormState = {};

function CompleteProfilePage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [state, formAction, isPending] = useActionState(
    completeProfile,
    initialState,
  );

  return (
    <div className="flex h-screen flex-1 items-center justify-center bg-(--second-color-hover)">
      <div className="mx-2 flex flex-col items-center justify-center rounded-lg bg-white p-10 lg:w-1/2 2xl:w-1/3">
        <Logo heigth={75} width={75} className="py-4" />
        <h1 className="text-center text-3xl font-bold text-black md:text-4xl">
          OSP Marki
        </h1>
        <h2 className="pt-2 text-center text-2xl font-bold text-black md:text-3xl">
          Platforma Szkoleniowa
        </h2>
        <hr className="mx-10 my-4 w-full" />
        {/* error message */}
        {state?.error && (
          <div className="mb-4 w-full rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {state.error}
          </div>
        )}
        <form action={formAction} className="flex w-full flex-col gap-3">
          <Label
            htmlFor="email"
            className="text-md flex flex-col items-start gap-2"
          >
            Imię
            <Input
              type="text"
              name="firstname"
              id="firstname"
              className="rounded-md border py-6 lg:text-lg"
              placeholder="Jan"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Label>
          <Label
            htmlFor="password"
            className="text-md relative flex flex-col items-start gap-2"
          >
            Nazwisko
            <Input
              type="text"
              name="lastname"
              id="lastname"
              className="rounded-md border py-6 lg:text-lg"
              placeholder="Kowalski"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Label>
          <InputPassword name="password" labelText="Hasło" />
          <InputPassword name="confirmPassword" labelText="Powtórz hasło" />

          <Button
            type="submit"
            size="lg"
            className="mt-12 cursor-pointer bg-(--second-color) px-8 py-6 text-lg font-semibold text-black hover:bg-(--second-color-hover)"
            disabled={isPending}
          >
            {isPending ? "Dokonuję rejestracji..." : "Zarejestruj się"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfilePage;
