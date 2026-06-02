import React from "react";

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="justify-betweens flex items-center gap-4">
      <div className="h-3 w-full rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-[#BBCB2E]"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <p className="text-sm font-bold text-black">{value.toFixed(0)}%</p>
    </div>
  );
}
