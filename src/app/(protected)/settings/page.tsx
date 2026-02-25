import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { getUser } from "@/utils/actions";

export default async function SettingsPage() {
  const result = await getUser();
  if (!result.success) {
    return <div>Błąd podczas pobierania danych użytkownika</div>;
  }
  const { data: user } = result;

  return <SettingsPanel userFromSupabase={user} />;
}
