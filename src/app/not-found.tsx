import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Page404() {
  return (
    <div className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <span className="text-brand-hover absolute inset-0 -z-10 hidden items-center justify-center text-center text-4xl text-[700px] font-bold opacity-30 md:flex">
        404
      </span>

      <h1 className="mb-8 text-center text-4xl font-bold text-black md:text-6xl">
        Wygląda na to, że się zgubiłeś...
      </h1>

      <Link href="/home">
        <Button
          size="lg"
          className="bg-brand hover:bg-brand-hover cursor-pointer px-8 py-6 text-lg font-semibold text-black"
        >
          Wróć do strony głownej
        </Button>
      </Link>
    </div>
  );
}

export default Page404;
