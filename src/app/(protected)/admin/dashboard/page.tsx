import StatisticCard from "@/components/admin/StatisticCard";
import { statCards } from "@/utils/utils";
import React from "react";

function AdminDashboradPage() {
  return (
    <div className="mx-auto max-w-7xl flex-1 px-4 pt-12">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      <div className="mb-8 grid grid-cols-1 gap-4 pr-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <StatisticCard card={card} key={index} />
        ))}
      </div>
    </div>
  );
}

export default AdminDashboradPage;
