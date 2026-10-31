"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { StatusRadioGroup } from "@/components/StatusRadioGroup";
import { useState, useTransition } from "react";

export type ModuleFormValues = {
  title: string;
  status: "published" | "draft";
};

type ModalProps = {
  trigger: React.ReactNode;
  dialogTitle: string;
  submitLabel: string;
  defaultValues?: Partial<ModuleFormValues>;
  onSubmit: (values: ModuleFormValues) => void;
};

export function Modal({
  trigger,
  dialogTitle,
  submitLabel,
  defaultValues,
  onSubmit,
}: ModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values: ModuleFormValues = {
      title: String(formData.get("title") ?? ""),
      status: formData.get("status") === "draft" ? "draft" : "published",
    };

    startTransition(() => onSubmit(values));
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField label="Nazwa modułu" htmlFor="module-title" required>
            <Input
              id="module-title"
              name="title"
              placeholder="np. Podstawy ratownictwa"
              defaultValue={defaultValues?.title}
              required
            />
          </FormField>
          <FormField label="Status">
            <StatusRadioGroup
              idPrefix="module"
              publishedLabel="Opublikowany"
              defaultValue={defaultValues?.status}
            />
          </FormField>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
              >
                Anuluj
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-brand hover:bg-brand-hover cursor-pointer text-black"
              disabled={isPending}
            >
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
