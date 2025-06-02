import { useState } from "react";
import { useTransactions } from "../../../features/transactions/store/transactions.context";
import {
  calculateBalance,
  convertValue,
} from "../../../shared/utils/calculate-balance";
import { useCurrency } from "../../../shared/store/currency/currency.context";
import SkeletonBlock from "./SkeletonBlock";
import { ToggleButton } from "../../../shared/components/ui/ToggleButton";

export const AccountOverview = () => {
  const {
    state: { transactions, loading },
  } = useTransactions("AccountOverview");
  const { currency, toggleCurrency } = useCurrency();
  const [showCurrentMonth, setShowCurrentMonth] = useState(true);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency,
    }).format(value);

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

  const renderValue = (value: number) =>
    loading === "pending" ? (
      <SkeletonBlock className="h-6 w-24 mx-auto" />
    ) : (
      formatCurrency(convertValue(currency, value))
    );

  return (
    <section
      className="w-full sm:w-1/2 md:w-1/2 bg-white dark:bg-background-dark px-6 py-2 rounded-3xl shadow-lg max-w-3xl mx-auto "
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
        <ToggleButton
          pressed={currency === "EUR"}
          onClick={toggleCurrency}
          disabled={loading === "pending"}
          aria-label="Switch currency"
        >
          {currency === "EUR" ? <span>€ Euro</span> : <span>$ Dollar</span>}
        </ToggleButton>
      </header>

      <div className="grid grid-cols-1 gap-4">
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
            <p
              data-testid="balance"
              className="text-lg font-extrabold text-indigo-900 dark:text-indigo-100"
            >
              {renderValue(balance)}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between px-4">
          {loading === "pending" ? (
            <>
              <SkeletonBlock className="h-6 w-32" />
              <SkeletonBlock className="h-7 w-28 rounded-full" />
            </>
          ) : (
            <>
              <p className="text-lg text-gray-800 dark:text-white font-semibold">
                {showCurrentMonth ? "Current month" : "Total"}
              </p>
              <ToggleButton
                pressed={showCurrentMonth}
                onClick={() => setShowCurrentMonth(!showCurrentMonth)}
                disabled={loading !== "success"}
                aria-label="Toggle between current month and total transactions"
              >
                {showCurrentMonth ? "Show all" : "Current Month"}
              </ToggleButton>
            </>
          )}
        </div>

        <div className="flex justify-between px-4 gap-4">
          <div
            className="text-center shadow-inner rounded-lg py-2 flex-1"
            aria-label={
              showCurrentMonth ? "Incomes for current month" : "Total incomes"
            }
          >
            <p
              data-testid="incomes"
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
            className="text-center shadow-inner rounded-lg py-2 flex-1"
            aria-label={
              showCurrentMonth ? "Expenses for current month" : "Total expenses"
            }
          >
            <p
              data-testid="expenses"
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
