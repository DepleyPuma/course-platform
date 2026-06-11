"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/logo";
import { sendResetPasswordLink } from "@/actions";
import { FormState } from "@/utils/types";
import { useActionState, useState } from "react";

const initialState: FormState = {};

function RestartPasswordPage() {
  const [email, setEmail] = useState("");
  const [state, formAction, isPending] = useActionState(
    sendResetPasswordLink,
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
          <div className="mb-4 w-full rounded-md border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-700">{state.error}</p>
          </div>
        )}
        <form action={formAction} className="flex w-full flex-col gap-3">
          <Label
            htmlFor="email"
            className="text-md flex flex-col items-start gap-2"
          >
            Email
            <Input
              type="text"
              name="email"
              id="email"
              className="rounded-md border py-6 lg:text-lg"
              placeholder="jan.kowalski@osp.pl"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Label>
          {/* error message */}
          {state?.success && (
            <div className="mb-4 w-full rounded-md border border-green-200 bg-green-50 p-3">
              <p className="text-sm text-black">
                Wiadomość z linkiem do zresetowania hasła została wysłana na
                powyższy email
              </p>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="mt-4 cursor-pointer bg-(--second-color) px-8 py-6 text-lg font-semibold text-black hover:bg-(--second-color-hover)"
            disabled={isPending}
          >
            {isPending ? "Wysyłanie..." : "Wyślij link do zresetowanie hasła"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RestartPasswordPage;
