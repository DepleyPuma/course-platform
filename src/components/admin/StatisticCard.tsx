import { Card } from "@/utils/types";
import React from "react";

type StatisticCardTypeProps = {
  card: Card;
};

export default function StatisticCard({ card }: StatisticCardTypeProps) {
  return (
    <div className={`${card.bgColor} rounded-lg border border-gray-200 p-6`}>
      <div className="flex items-center gap-4">
        <div className={`rounded-lg p-3 ${card.iconColor} bg-white`}>
          <card.icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{card.label}</p>
          <p className="mt-1 text-2xl font-bold">{card.value}</p>
        </div>
      </div>
    </div>
  );
}
