"use client";

import InputPassword from "@/components/auth/update-password/InputPassword";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { useState } from "react";

function UpdatePasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const newPassword = String(formData.get("newPassword") ?? "").trim();
    const confirmNewPassword = String(
      formData.get("confirmNewPassword") ?? "",
    ).trim();

    if (!newPassword) {
      setError("Musisz podać nowe hasło");
      return;
    }

    if (newPassword.length < 8) {
      setError("Hasło musi składać się z minimum 8 znaków");
      return;
    }

    if (!confirmNewPassword || confirmNewPassword !== newPassword) {
      setError("Powtórzone hasło nie zgadza się z nowym hasłem");
      return;
    }

    setIsPending(true);

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    setIsPending(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
  };

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
        {error && (
          <div className="mb-4 w-full rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
          <InputPassword name="newPassword" labelText="Nowe hasło" />
          <InputPassword name="confirmNewPassword" labelText="Powtórz hasło" />
          {success && (
            <div className="mb-4 w-full rounded-md border border-green-200 bg-green-50 p-3">
              <p className="text-sm text-black">
                Hasło zostało pomyślnie zresetowane
              </p>
            </div>
          )}
          {success ? (
            <Link href="/login">
              <Button
                type="submit"
                size="lg"
                className="mt-12 w-full cursor-pointer bg-(--second-color) px-8 py-6 text-lg font-semibold text-black hover:bg-(--second-color-hover)"
              >
                Wróć do strony z logowaniem
              </Button>
            </Link>
          ) : (
            <Button
              type="submit"
              size="lg"
              className="mt-12 cursor-pointer bg-(--second-color) px-8 py-6 text-lg font-semibold text-black hover:bg-(--second-color-hover)"
              disabled={isPending}
            >
              {isPending ? "Resetuje..." : "Resetuj hasło"}
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default UpdatePasswordPage;
