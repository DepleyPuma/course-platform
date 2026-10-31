"use client";

import { Module } from "@/utils/types";
import { useSortable } from "@dnd-kit/react/sortable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal, ModuleFormValues } from "@/components/Modal";
import { Popup } from "@/components/Popup";
import { Folder, GripVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteModule, updateModule } from "@/actions/admin/modules.actions";

export const ModuleItem = ({
  module,
  index,
}: {
  module: Module;
  index: number;
}) => {
  const { ref, handleRef, isDragging } = useSortable({
    id: module.id,
    index,
  });

  const lessonCount = module.lessons?.length ?? 0;

  async function handleEditSubmit(values: ModuleFormValues) {
    const result = await updateModule({ id: module.id, ...values });

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Moduł zaktualizowany pomyślnie");
  }

  async function handleDelete() {
    const result = await deleteModule(module.id);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Moduł usunięty pomyślnie");
  }

  return (
    <div
      ref={ref}
      className={`relative flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 hover:bg-gray-50 sm:flex-row sm:items-center ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <Link
        href={`/admin/modules/${module.id}`}
        className="absolute inset-0 z-0"
        aria-label={`Otwórz moduł ${module.title}`}
      />

      <div className="flex items-start gap-3 sm:flex-1 sm:items-center">
        <Button
          variant="ghost"
          type="button"
          ref={handleRef}
          className="relative z-10 cursor-grab touch-none text-gray-400 hover:text-gray-600 active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5" />
        </Button>
        <Folder
          className="h-8 w-8 shrink-0 text-yellow-500"
          fill="currentColor"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h2 className="font-semibold wrap-break-word">{module.title}</h2>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>{lessonCount} lekcje</span>
            <Badge
              variant="outline"
              className={
                module.status === "published"
                  ? "rounded-full border-green-200 bg-green-50 text-green-700"
                  : "rounded-full border-amber-400 bg-amber-100 text-amber-600"
              }
            >
              {module.status === "published" ? "opublikowany" : "szkic"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-end gap-1 self-end sm:self-auto">
        <Modal
          trigger={
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Pencil className="h-4 w-4" />
            </Button>
          }
          dialogTitle="Edytuj moduł"
          submitLabel="Zapisz zmiany"
          defaultValues={{ title: module.title, status: module.status }}
          onSubmit={handleEditSubmit}
        />
        <Popup
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          }
          title="Usuń moduł"
          description={`Czy na pewno chcesz usunąć moduł ${module.title}?`}
          confirmLabel="Tak, usuń"
          confirmVariant="destructive"
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
};
