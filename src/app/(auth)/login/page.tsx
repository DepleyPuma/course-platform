"use client";

import { Logo } from "@/components/ui/logo";
import React, { useActionState, useState } from "react";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { login } from "@/utils/actions";
import { FormState } from "@/utils/types";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const initialState: FormState = {};

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [state, formAction, isPending] = useActionState(login, initialState);

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsShown((prevState) => !prevState);
  };

  return (
    <div
      className={`flex h-screen flex-1 items-center justify-center bg-(--second-color-hover) ${poppins.className}`}
    >
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
          <Label
            htmlFor="password"
            className="text-md relative flex flex-col items-start gap-2"
          >
            Hasło
            <Input
              type={isShown ? "text" : "password"}
              name="password"
              id="password"
              className="rounded-md border py-6 lg:text-lg"
              placeholder="••••••••••••"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              onClick={togglePassword}
              size="sm"
              variant="ghost"
              className="absolute top-10 right-4 cursor-pointer"
            >
              {isShown ? <EyeOff /> : <Eye />}
            </Button>
          </Label>

          <Button
            type="submit"
            size="lg"
            className="mt-12 cursor-pointer bg-(--second-color) px-8 py-6 text-lg font-semibold text-black hover:bg-(--second-color-hover)"
            disabled={isPending}
          >
            {isPending ? "Loguje się..." : "Zaloguj się"}
          </Button>
        </form>
        <a href="#" className="mt-6 self-start hover:underline">
          Zapomniałeś hasła?
        </a>
        <hr className="mx-10 my-4 w-full" />
        <p>Nie masz konta? Skontaktuj się z administratorem</p>
      </div>
    </div>
  );
}

export default LoginPage;
