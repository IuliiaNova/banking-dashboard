import { useState } from "react";
import { useTransactions } from "../transactions/store/transactions.context";
import { prepareChartData } from "./data/prepareChartData";
import { Selector } from "./components/Selector";
import { IncomeExpenseChart } from "./components/Chart";

export default function IncomeExpenseDashboard() {
  const {
    state: { transactions },
  } = useTransactions("AccountOverview");
  const [period, setPeriod] = useState("week");
  const chartData = prepareChartData(transactions, period);

  const totalIncome = chartData.reduce((acc, d) => acc + d.income, 0);
  const totalExpense = chartData.reduce((acc, d) => acc + d.expense, 0);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-2 dark:text-gray-50">
        Incomes & Expenses
      </h1>
      <Selector period={period} setPeriod={setPeriod} />
      <div className="flex justify-around mt-6 mb-2">
        <div>
          <span className="text-gray-500 text-sm block dark:text-gray-400">
            Income
          </span>
          <span className="text-green-500 font-bold text-lg dark:text-teal-400">
            ${totalIncome.toFixed(2)}
          </span>
        </div>
        <div>
          <span className="text-gray-500 text-sm block dark:text-gray-400">
            Expense
          </span>
          <span className="text-red-500 font-bold text-lg dark:text-rose-400">
            ${totalExpense.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="w-full bg-white dark:bg-zinc-800 rounded-2xl shadow-lg dark:shadow-gray-800 p-2">
        <IncomeExpenseChart data={chartData} />
      </div>
    </div>
  );
}
