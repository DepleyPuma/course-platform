"use client";

import { useEffect, useState } from "react";
import { DragDropProvider, DragEndEvent } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { Module } from "@/utils/types";
import { ModuleItem } from "@/components/admin/ModuleItem";
import { Button } from "@/components/ui/button";
import { updateModulesOrder } from "@/actions/admin/modules.actions";
import { toast } from "sonner";

export const ModulesView = ({
  modules: initialModules,
}: {
  modules: Module[];
}) => {
  const [modules, setModules] = useState(initialModules);

  const isModulesChanged = modules.some(
    (module, index) => module.id !== initialModules[index]?.id,
  );

  function handleDragEnd(event: DragEndEvent) {
    if (event.canceled) return;

    setModules((items) => move(items, event));
  }

  async function handleSaveChanges() {
    const reorderedModules = modules.map((module, index) => ({
      ...module,
      order_index: index,
    }));
    const result = await updateModulesOrder(reorderedModules);
    if (result.success) {
      setModules(reorderedModules);
      toast.success("Kolejność modułów zaktualizowana");
    } else {
      toast.error(result.error);
    }
  }

  useEffect(() => {
    setModules(initialModules);
  }, [initialModules]);

  return (
    <div className="relative pt-10">
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="flex flex-col gap-3">
          {modules.map((module, index) => (
            <ModuleItem key={module.id} module={module} index={index} />
          ))}
        </div>
      </DragDropProvider>
      {isModulesChanged && (
        <div className="fixed right-6 bottom-6">
          <Button
            onClick={handleSaveChanges}
            className="bg-brand hover:bg-brand-hover cursor-pointer text-black"
          >
            Zapisz zmiany
          </Button>
        </div>
      )}
    </div>
  );
};
