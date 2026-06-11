import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";
import { getUser, getUserProgress } from "@/actions";

export default async function SettingsPage() {
  const userResult = await getUser();

  if (!userResult.success) {
    return <div>Błąd podczas pobierania danych użytkownika</div>;
  }

  const { data: user } = userResult;

  const userProgressResult = await getUserProgress(user.id);

  const userProgress = userProgressResult.success
    ? userProgressResult.data
    : null;

  return (
    <div className="flex flex-1 overflow-hidden">
      <SettingsSidebar />
      <SettingsPanel userFromSupabase={user} userProgress={userProgress} />
    </div>
  );
}
