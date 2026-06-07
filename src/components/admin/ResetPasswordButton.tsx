"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import { toast } from "sonner";
import { resetPassword } from "@/utils/actions";

type ResetPasswordButtonProps = {
  email: string;
};

export function ResetPasswordButton({ email }: ResetPasswordButtonProps) {
  const [isPending, setIsPending] = useState(false);

  async function handleReset() {
    setIsPending(true);
    try {
      const result = await resetPassword(email);

      if (result.success) {
        toast.success("Link do resetowania hasła został wysłany", {
          position: "bottom-right",
        });
      } else {
        toast.error(result.message ?? result.error, {
          position: "bottom-right",
        });
      }
    } catch {
      toast.error("Błąd podczas resetowania hasła", {
        position: "bottom-right",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleReset}
      disabled={isPending}
      className="inline-flex cursor-pointer items-center gap-2"
      title="Reset hasła"
    >
      <Key className="h-4 w-4" />
      Reset hasła
    </Button>
  );
}
