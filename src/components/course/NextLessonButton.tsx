// components/course/CompleteLessonButton.tsx
"use client";

import { completeLesson } from "@/actions";
import { FormState } from "@/utils/types";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const initialState: FormState = {};

type Props = {
  lessonId: string;
  nextHref: string | undefined;
};

export const NextLessonButton = ({ lessonId, nextHref }: Props) => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    completeLesson,
    initialState,
  );

  useEffect(() => {
    if (state?.success && nextHref) {
      router.push(nextHref);
    }
  }, [state?.success, nextHref, router]);

  return (
    <form action={formAction}>
      <input type="hidden" name="lessonId" value={lessonId} />
      <Button
        type="submit"
        disabled={isPending}
        className="flex w-full cursor-pointer items-center gap-2 bg-[#BBCB2E] px-6 py-6 text-black hover:bg-[#a5b629] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span>
          {isPending
            ? "Zapisywanie..."
            : "Zakończ i przejdź do następnej lekcji"}
        </span>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
};
