import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type PrevLessonButtonTypeProps = {
  prevHref: string | undefined;
};

export function PrevLessonButton({ prevHref }: PrevLessonButtonTypeProps) {
  return (
    <Button
      disabled={!prevHref}
      className="flex cursor-pointer items-center gap-2 bg-brand px-6 py-6 text-black hover:bg-brand-hover disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
      asChild={!!prevHref}
    >
      {prevHref ? (
        <Link href={prevHref}>
          <ArrowLeft className="h-4 w-4" />
          <span>Poprzednia lekcja</span>
        </Link>
      ) : (
        <>
          <ArrowLeft className="h-4 w-4" />
          <span>Poprzednia lekcja</span>
        </>
      )}
    </Button>
  );
}
