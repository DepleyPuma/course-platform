import StatisticCard from "@/components/admin/StatisticCard";
import { getDashboardData } from "@/utils/actions";
import { statCards } from "@/utils/utils";

async function AdminDashboradPage() {
  const results = await getDashboardData();

  if (!results.success) {
    console.log("Nie udało się pobrać danych");
    return;
  }

  const dashboardData = results.data as Record<string, number>;

  console.log(dashboardData);
  return (
    <div className="mx-auto max-w-7xl flex-1 px-4 pt-12">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      <div className="mb-8 grid grid-cols-1 gap-4 pr-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <StatisticCard
            key={card.key}
            card={card}
            value={dashboardData[card.key] ?? 0}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminDashboradPage;
