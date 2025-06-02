import type { Dispatch, SetStateAction } from "react";

interface SelectorProps {
  period: string;
  setPeriod: Dispatch<SetStateAction<string>>;
}
export function Selector({ period, setPeriod }: SelectorProps) {
  return (
    <div className="flex gap-2 justify-center mt-4">
      <button
        onClick={() => setPeriod("week")}
        className={`px-4 py-2 rounded-2xl shadow transition
          ${period === "week"
            ? "bg-rose-active text-white dark:bg-rose-500"
            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"}`}
      >
        This Week
      </button>
      <button
        onClick={() => setPeriod("month")}
        className={`px-4 py-2 rounded-2xl shadow transition
          ${period === "month"
            ? "bg-rose-active text-white dark:bg-rose-500"
            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"}`}
      >
        This Month
      </button>
    </div>
  );
}
