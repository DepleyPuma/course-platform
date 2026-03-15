import React from "react";
import { BarChart3 } from "lucide-react";

export const ProgressSection = () => {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-gray-600" />
        <h2 className="text-xl font-bold">Mój postęp</h2>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 md:gap-5">
        <h2>Your progress will be displayed here</h2>
      </div>
    </section>
  );
};
