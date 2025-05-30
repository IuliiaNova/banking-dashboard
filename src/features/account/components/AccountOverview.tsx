import { useState } from "react";
import { useTransactions } from "../../../features/transactions/store/transactions.context";
import { calculateBalance } from "../../../shared/utils/calculate-balance";

export const AccountOverview = () => {
  const {
    state: { transactions, loading },
  } = useTransactions("AccountOverview");

  const [currency, setCurrency] = useState<"EUR" | "USD">("EUR");
  const [showCurrentMonth, setShowCurrentMonth] = useState(true);

  const exchangeRate = 1.1;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency,
    }).format(value);

  const convertValue = (value: number) => {
    if (currency === "USD") {
      return value * exchangeRate;
    }
    return value;
  };

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const balance = calculateBalance(transactions);

  const filteredTransactions = showCurrentMonth
    ? transactions.filter((t) => {
        const tDate = new Date(t.date);
        return (
          tDate.getFullYear() === currentYear &&
          tDate.getMonth() === currentMonth
        );
      })
    : transactions;

  const income = filteredTransactions
    .filter((t) => t.type === "Deposit")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = filteredTransactions
    .filter((t) => t.type === "Withdrawal")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Skeleton loader para los valores
  const SkeletonBlock = ({ className = "" }) => (
    <div
      className={`bg-gray-300 dark:bg-gray-700 rounded animate-pulse ${className}`}
      aria-hidden="true"
    />
  );

  const renderValue = (value: number) =>
    loading === "pending" ? (
      <SkeletonBlock className="h-6 w-24 mx-auto" />
    ) : (
      formatCurrency(convertValue(value))
    );

  return (
    <section
      className="bg-white dark:bg-background-dark px-6 py-2 rounded-3xl shadow-lg max-w-3xl mx-auto"
      role="region"
      aria-labelledby="account-overview-title"
    >
      <header className="flex items-center justify-between my-2">
        {loading === "pending" ? (
          <SkeletonBlock className="h-8 w-48" />
        ) : (
          <h2
            id="account-overview-title"
            className="text-lg font-semibold text-gray-900 dark:text-gray-100"
          >
            Account Overview
          </h2>
        )}
        <button
          onClick={() => setCurrency(currency === "EUR" ? "USD" : "EUR")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
            loading === "pending"
              ? "border-transparent bg-gray-200 dark:bg-gray-700 cursor-default"
              : "border-gray-200 dark:border-gray-700 bg-gray-20 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-rose-base transition"
          } text-sm font-medium shadow-sm`}
          aria-label="Switch currency"
          type="button"
          disabled={loading === "pending"}
        >
          {loading === "pending" ? (
            <SkeletonBlock className="h-5 w-16" />
          ) : currency === "EUR" ? (
            <span>€ Euro</span>
          ) : (
            <span>$ Dollar</span>
          )}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className={`bg-white dark:bg-rose-base/5 rounded-2xl p-3 text-center shadow-inner ${
            loading === "pending" ? "cursor-wait" : ""
          }`}
          aria-label="Available balance"
        >
          <p
            className={`text-sm font-semibold text-rose-base dark:rose-base mb-2 uppercase tracking-wide ${
              loading === "pending" ? "invisible" : ""
            }`}
          >
            Available Balance
          </p>
          {loading === "pending" ? (
            <SkeletonBlock className="h-8 w-32 mx-auto" />
          ) : (
            <p className="text-lg font-extrabold text-indigo-900 dark:text-indigo-100">
              {renderValue(balance)}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between px-4 mb-2">
          {loading === "pending" ? (
            <>
              <SkeletonBlock className="h-6 w-32" />
              <SkeletonBlock className="h-7 w-28 rounded-full" />
            </>
          ) : (
            <>
              <p className="text-lg text-white font-semibold">
                {showCurrentMonth ? "Current month" : "Total"}
              </p>
              <button
                type="button"
                onClick={() => setShowCurrentMonth(!showCurrentMonth)}
                className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-rose-base dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition"
                aria-pressed={showCurrentMonth}
                aria-label="Toggle between current month and total transactions"
              >
                {showCurrentMonth ? "Mostrar Total" : "Mostrar Mes Actual"}
              </button>
            </>
          )}
        </div>

        <div className="flex justify-between px-4 gap-4">
          <div
            className="text-center shadow-inner rounded-lg pb-2 flex-1"
            aria-label={
              showCurrentMonth ? "Incomes for current month" : "Total incomes"
            }
          >
            <p
              className={`text-sm font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide ${
                loading === "pending" ? "invisible" : ""
              }`}
            >
              Incomes
            </p>
            {loading === "pending" ? (
              <SkeletonBlock className="h-8 w-24 mx-auto" />
            ) : (
              <p className="text-lg font-bold text-green-900 dark:text-green-100">
                {renderValue(income)}
              </p>
            )}
          </div>

          <div
            className="text-center shadow-inner rounded-lg pb-2 flex-1"
            aria-label={
              showCurrentMonth ? "Expenses for current month" : "Total expenses"
            }
          >
            <p
              className={`text-sm font-semibold text-red-700 dark:text-red-300 uppercase tracking-wide ${
                loading === "pending" ? "invisible" : ""
              }`}
            >
              Expenses
            </p>
            {loading === "pending" ? (
              <SkeletonBlock className="h-8 w-24 mx-auto" />
            ) : (
              <p className="text-lg font-bold text-red-900 dark:text-red-100">
                {renderValue(expenses)}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
