import React from "react";

type FinancialUnitProps = {
  title: string;
  code: string;
  amount?: number;
  type: "card" | "account" | string;
  status?: string;
  icon?: React.ReactNode;
};

export default function FinancialUnit({
  title,
  code,
  amount,
  type,
  status,
  icon,
}: FinancialUnitProps) {
  const lastFourDigits = code.slice(-4);

  return (
    <div className="w-44 sm:w-80 md:w-[21rem] px-6 bg-white dark:bg-background-dark rounded-2xl shadow-md p-4 flex flex-col gap-3 transition-all duration-300">
      <div className="flex items-center gap-3">
        {icon && <div className="text-xl text-rose-base">{icon}</div>}
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
          {title}
        </span>
      </div>

      <div className="text-gray-500 dark:text-gray-400 text-sm tracking-widest">
        •••• {lastFourDigits}
      </div>

      {type === "card" ? (
        <div className="text-sm font-medium text-blue-600 dark:text-green-600 flex gap-2 items-center">
          <div className="w-3 h-3 rounded-full bg-green-600" />
          <span>{status || "Stateless"}</span>
        </div>
      ) : (
        <div className="text-lg font-bold text-blsck dark:text-gray-200">
          {amount != null ? `${amount.toLocaleString()} €` : "0 €"}
        </div>
      )}
    </div>
  );
}
