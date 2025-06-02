import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
  } from "recharts";
  import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { useIsDarkMode } from "../../../shared/hook/useIsDarkMode";
  
  export type ChartDataPoint = {
    label: string;
    date: string;
    income: number;
    expense: number;
  };
  
  export function IncomeExpenseChart({ data }: { data: ChartDataPoint[] }) {
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
  }
  