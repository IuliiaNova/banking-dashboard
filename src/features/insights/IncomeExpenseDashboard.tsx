import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
  addDays,
  isWithinInterval,
  parseISO,
  isSameDay,
} from "date-fns";
import { useTransactions } from "../transactions/store/transactions.context";
import type { Transaction } from "../../entities/models/transactions";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

function useIsDarkMode() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDark;
}

const Selector = ({
  period,
  setPeriod,
}: {
  period: string;
  setPeriod: Dispatch<SetStateAction<string>>;
}) => (
  <div className="flex gap-2 justify-center mt-4">
    <button
      onClick={() => setPeriod("week")}
      className={`px-4 py-2 rounded-2xl shadow transition
        ${
          period === "week"
            ? "bg-rose-active text-white dark:bg-rose-500"
            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
        }`}
    >
      This Week
    </button>
    <button
      onClick={() => setPeriod("month")}
      className={`px-4 py-2 rounded-2xl shadow transition
        ${
          period === "month"
            ? "bg-rose-active text-white dark:bg-rose-500"
            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
        }`}
    >
      This Month
    </button>
  </div>
);

type ChartDataPoint = {
  label: string;
  date: string;
  income: number;
  expense: number;
};

const IncomeExpenseChart = ({ data }: { data: Array<ChartDataPoint> }) => {
  const isDark = useIsDarkMode();
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="label"
          stroke={isDark ? "#e5e7eb" : "#374151"}
          tick={{ fill: isDark ? "#e5e7eb" : "#374151" }}
        />
        <YAxis
          stroke={isDark ? "#e5e7eb" : "#374151"}
          tick={{ fill: isDark ? "#e5e7eb" : "#374151" }}
        />
        <Tooltip
          contentStyle={{
            background: isDark ? "#18181b" : "#fff",
            borderColor: isDark ? "#27272a" : "#e5e7eb",
            color: isDark ? "#f3f4f6" : "#18181b",
          }}
          itemStyle={{
            color: isDark ? "#f87171" : "#ef4444",
          }}
          formatter={(value: ValueType, name: NameType) => [
            typeof value === "number"
              ? `$${value.toFixed(2)}`
              : `$${!isNaN(Number(value)) ? Number(value).toFixed(2) : value}`,
            name === "income" ? "Income" : "Expense",
          ]}
        />
        <Legend
          wrapperStyle={{
            color: isDark ? "#e5e7eb" : "#374151",
          }}
        />
        <Bar
          dataKey="income"
          fill={isDark ? "#22d3ee" : "#4ade80"}
          name="Income"
          radius={[6, 6, 0, 0]}
        />
        <Bar
          dataKey="expense"
          fill={isDark ? "#f43f5e" : "#f87171"}
          name="Expense"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

function getDaysArray(start: string | Date, end: string | Date) {
  let arr = [];
  let dt = start;
  while (dt <= end) {
    arr.push(dt);
    dt = addDays(dt, 1);
  }
  return arr;
}

const prepareChartData = (transactions: Transaction[], period: string) => {
  const today = new Date();
  const range =
    period === "week"
      ? [
          startOfWeek(today, { weekStartsOn: 1 }),
          endOfWeek(today, { weekStartsOn: 1 }),
        ]
      : [startOfMonth(today), endOfMonth(today)];

  const days = getDaysArray(range[0], range[1]);
  let data = days.map((date) => ({
    label: period === "week" ? format(date, "EEE") : format(date, "dd MMM"),
    date: format(date, "yyyy-MM-dd"),
    income: 0,
    expense: 0,
  }));

  transactions.forEach((t: Transaction) => {
    const tDate = parseISO(t.date);
    const idx = data.findIndex((d) => isSameDay(tDate, parseISO(d.date)));
    if (
      isWithinInterval(tDate, { start: range[0], end: range[1] }) &&
      idx !== -1
    ) {
      if (t.type === "Deposit") data[idx].income += t.amount;
      else data[idx].expense += Math.abs(t.amount);
    }
  });

  return data;
};

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
        Income & Expenses
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
