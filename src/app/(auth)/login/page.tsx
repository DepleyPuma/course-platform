"use client";

import { Logo } from "@/components/ui/logo";
import React, { useState } from "react";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

function LoginPage() {
  const [password, setPassword] = useState("");
  const [isShown, setIsShown] = useState(false);

  //   it's working
  const togglePassword = (e: Event) => {
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
        {/* <p className="self-start pb-4 font-medium">Zaloguj się do platformy</p> */}
        <form action="" className="flex w-full flex-col gap-3">
          <label htmlFor="email" className="flex flex-col gap-1">
            Email
            <input
              type="text"
              name="email"
              id="email"
              className="rounded-md border p-2 text-lg"
              placeholder="jan.kowalski@osp.pl"
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-1">
            Hasło
            <input
              type={isShown ? "text" : "password"}
              name="password"
              id="password"
              className="rounded-md border p-2 text-lg"
              placeholder="••••••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label htmlFor="rememberMe" className="mt-2 flex items-center gap-2">
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              className="h-4 w-4 accent-(--second-color-hover)"
            />
            Zapamiętaj mnie
          </label>

          <Button
            type="submit"
            size="lg"
            className="mt-5 cursor-pointer bg-[#BBCB2E] px-8 py-6 text-lg font-semibold text-black hover:bg-[#a5b629]"
          >
            Zaloguj się
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
