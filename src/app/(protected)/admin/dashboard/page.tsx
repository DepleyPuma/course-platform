import DashboardStatisticCardsSection from "@/components/admin/DashboardStatisticCardsSection";
import { ProgressTable } from "@/components/admin/ProgressTable";
import { getAllUsers, getDashboardData } from "@/utils/actions";
import { User } from "@/utils/types";

async function AdminDashboradPage() {
  const results = await Promise.all([getDashboardData(), getAllUsers()]);

  if (!results[0].success || !results[1].success) {
    console.log("Nie udało się pobrać danych");
    return;
  }

  const dashboardData = results[0].data as Record<string, number>;
  const users = results[1].data as User[];

  console.log(dashboardData);
  return (
    <div className="mx-auto max-w-7xl flex-1 px-4 pt-12">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      <DashboardStatisticCardsSection dashboardData={dashboardData} />
      <ProgressTable users={users} />
    </div>
  );
}

export default AdminDashboradPage;
