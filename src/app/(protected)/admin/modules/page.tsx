import { AddModuleButton } from "@/components/admin/AddModuleButton";
import { getAllModulesAdmin } from "@/actions/admin/modules.actions";
import { ErrorMessage } from "@/components/ui/error-message";
import { Module } from "@/utils/types";
import { ModulesView } from "@/components/admin/ModulesView";

async function AllModulesPage() {
  const results = await getAllModulesAdmin();

  if (!results.success) {
    return <ErrorMessage>Nie udało się pobrać danych.</ErrorMessage>;
  }
  const modules = results.data as Module[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Zarządzanie modułami</h1>
        <AddModuleButton />
      </div>
      <ModulesView modules={modules} />
    </div>
  );
}

export default AllModulesPage;
