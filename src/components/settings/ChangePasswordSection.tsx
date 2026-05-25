import React, { useActionState, useEffect } from "react";
import { FormState } from "@/utils/types";
import { changePassword } from "@/utils/actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

const initialState: FormState = {};

export const ChangePasswordSection = () => {
  const [changePasswordState, changePasswordAction, isPasswordChange] =
    useActionState(changePassword, initialState);

  useEffect(() => {
    if (changePasswordState?.success === undefined) return;

    if (changePasswordState?.success) {
      toast.success("Hasło zostało zmienione", {
        position: "bottom-right",
      });
    } else {
      toast.error(changePasswordState?.error, {
        position: "bottom-right",
      });
    }
  }, [changePasswordState]);
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Lock className="h-5 w-5 text-gray-600" />
        <h2 className="text-xl font-bold">Bezpieczeństwo</h2>
      </div>

      <form
        action={changePasswordAction}
        className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 md:gap-5"
      >
        <div className="flex flex-col gap-3">
          <Label className="flex flex-col items-start">Obecne hasło</Label>
          <Input
            type="password"
            name="currentPassword"
            id="currentPassword"
            placeholder="••••••••••••"
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label className="flex flex-col items-start">Nowe hasło</Label>
          <Input
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="Minimum 8 znaków"
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label className="flex flex-col items-start">
            Powtórz nowe hasło
          </Label>
          <Input
            type="password"
            name="confirmNewPassword"
            id="confirmNewPassword"
            placeholder="Powtórz hasło"
          />
        </div>

        <Button
          type="submit"
          className="cursor-pointer self-end bg-(--second-color) text-black hover:bg-(--second-color-hover)"
          disabled={isPasswordChange}
        >
          Resetuj hasło
        </Button>
      </form>
    </section>
  );
};
