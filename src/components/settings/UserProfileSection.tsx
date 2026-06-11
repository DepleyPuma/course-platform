import React, { useActionState, useEffect, useState } from "react";
import { FormState, User as UserType } from "@/utils/types";
import { updateMyProfile } from "@/actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

type UserProfileSectionTypeProps = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

const initialState: FormState = {};

export const UserProfileSection = ({
  user,
  setUser,
}: UserProfileSectionTypeProps) => {
  const [newFirstname, setNewFirstname] = useState(user.firstname);
  const [newLastname, setNewLastname] = useState(user.lastname);
  const [updateUserDataState, updateUserAction, isUpdateUserPending] =
    useActionState(updateMyProfile, initialState);

  const setAdditionalRoles = () => {
    if (user.additional_roles.length > 0) {
      return user.additional_roles.join(", ");
    } else if (user.additional_roles.length === 1) {
      return user.additional_roles.join(" ");
    } else {
      return "Brak dodatkowych ról";
    }
  };

  const updateUserData = () => {
    setUser((prevState) => ({
      ...prevState,
      firstname: newFirstname,
      lastname: newLastname,
    }));
  };

  useEffect(() => {
    if (updateUserDataState?.success === undefined) return;

    if (updateUserDataState?.success) {
      toast.success("Dane zostały zaktualizowane", {
        position: "bottom-right",
      });
    } else {
      toast.error(updateUserDataState?.error, {
        position: "bottom-right",
      });
    }
  }, [updateUserDataState]);

  return (
    <section>
      <aside className="mb-4 flex items-center gap-2">
        <User className="h-5 w-5 text-gray-600" />
        <h2 className="text-xl font-bold">Profil</h2>
      </aside>

      <form
        action={updateUserAction}
        className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 md:gap-5"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col gap-3">
            <Label htmlFor="firstname">Imię</Label>
            <Input
              defaultValue={user.firstname}
              type="text"
              name="firstname"
              id="firstname"
              onChange={(e) => setNewFirstname(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="lastname">Nazwisko</Label>
            <Input
              defaultValue={user.lastname}
              type="text"
              name="lastname"
              id="lastname"
              onChange={(e) => setNewLastname(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Label className="flex flex-col items-start">Email</Label>
          <Input
            defaultValue={user.email}
            type="text"
            name="email"
            id="email"
            disabled
            className="cursor-not-allowed border-0 bg-gray-100"
          />
          <p className="pt-2 text-sm text-gray-500">
            Email może zmienić tylko administrator
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Label className="flex flex-col items-start">Rola dodatkowa</Label>
          <Input
            defaultValue={setAdditionalRoles()}
            type="text"
            name="additional_roles"
            id="additional_roles"
            disabled
            className="cursor-not-allowed border-0 bg-gray-100"
          />
          <p className="pt-2 text-sm text-gray-500">
            Rolę może zmienić tylko administrator
          </p>
        </div>

        <Button
          onClick={updateUserData}
          type="submit"
          className="cursor-pointer self-end bg-(--second-color) text-black hover:bg-(--second-color-hover)"
        >
          {isUpdateUserPending ? "Zapisuje zmiany..." : "Zapisz zmiany"}
        </Button>
      </form>
    </section>
  );
};
