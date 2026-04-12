import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { Sidebar } from "@/components/Sidebar";
import { getUser } from "@/utils/actions";
import { sidebarSettingsContent } from "@/utils/sidebarContent";
import Link from "next/link";

export default async function SettingsPage() {
  const result = await getUser();
  if (!result.success) {
    return <div>Błąd podczas pobierania danych użytkownika</div>;
  }
  const { data: user } = result;

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar>
        {sidebarSettingsContent.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </Sidebar>
      <SettingsPanel userFromSupabase={user} />
    </div>
  );
}
