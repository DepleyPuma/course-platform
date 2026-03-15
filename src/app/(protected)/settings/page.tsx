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
          // const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              // onClick={() => {
              //   if (window.innerWidth < 768) {
              //     setIsSidebarOpen(false);
              //   }
              // }}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
              // ${
              //   isActive
              //     ? "bg-[#F0F4E8] font-medium text-black"
              //     : "text-gray-700 hover:bg-gray-100"
              // }`
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
