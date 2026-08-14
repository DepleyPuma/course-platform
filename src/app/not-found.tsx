import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Page404() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="absolute -z-10 mb-8 text-center text-4xl font-bold text-brand-hover opacity-30 md:text-[700px]">
        404
      </h1>

      <h1 className="mb-8 text-center text-4xl font-bold text-black md:text-6xl">
        Wygląda na to, że się zgubiłeś...
      </h1>

      <Link href="/home">
        <Button
          size="lg"
          className="cursor-pointer bg-brand px-8 py-6 text-lg font-semibold text-black hover:bg-brand-hover"
        >
          Wróć do strony głownej
        </Button>
      </Link>
    </div>
  );
}

export default Page404;
