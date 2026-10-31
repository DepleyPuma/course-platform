"use client";

import { addModule } from "@/actions/admin/modules.actions";
import { Modal, ModuleFormValues } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

export function AddModuleButton() {
  async function handleSubmit(values: ModuleFormValues) {
    const result = await addModule(values);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Moduł dodany pomyślnie");
  }

  return (
    <Modal
      trigger={
        <Button className="bg-brand hover:bg-brand-hover cursor-pointer text-black">
          <PlusIcon className="h-4 w-4" />
          Dodaj moduł
        </Button>
      }
      dialogTitle="Nowy moduł"
      submitLabel="Zapisz moduł"
      onSubmit={handleSubmit}
    />
  );
}
