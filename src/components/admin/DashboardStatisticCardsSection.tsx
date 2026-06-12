import StatisticCard from "@/components/admin/StatisticCard";
import { statCards } from "@/utils/utils";

type DashboardStatisticCardsSectionProps = {
  dashboardData: Record<string, number>;
};

export default function DashboardStatisticCardsSection({
  dashboardData,
}: DashboardStatisticCardsSectionProps) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {statCards.map((card) => (
        <StatisticCard
          key={card.key}
          card={card}
          value={
            card.showPercent
              ? `${dashboardData[card.key] ?? 0}%`
              : (dashboardData[card.key] ?? 0)
          }
        />
      ))}
    </div>
  );
}
