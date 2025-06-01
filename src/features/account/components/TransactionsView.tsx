import { ArrowRight } from "lucide-react";
import { useTransactions } from "../../transactions/store/transactions.context";
import { formatDate } from "../../../shared/utils/date";
import {
  getAmountStyle,
} from "../../transactions/utils/amountFormat";
import { useNavigate } from "react-router-dom";

export default function TransactionsView() {
  const navigate = useNavigate();
  const {
    state: { transactions },
  } = useTransactions("TransactionsView");

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-2 items-center md:justify-start lg:justify-start justify-start">
      <div className="w-full sm:w-1/2 md:w-1/2 bg-white dark:bg-background-dark rounded-2xl shadow-md p-4 flex flex-col justify-start items-start gap-3 transition-all duration-300">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
          Transactions Overview
        </span>

        <div className="w-full flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center py-2 text-gray-800 dark:text-gray-100 text-xs"
              role="listitem"
            >
              <span className="font-medium">
                {formatDate(transaction.date)}
              </span>
              <span className="truncate max-w-[150px] text-start">
                {transaction.description}
              </span>
              <span
                className={`text-sm font-semibold ${getAmountStyle(
                  transaction.type
                )}`}
              >
                {transaction.amount }{'€'}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="cursor-pointer text-rose-base flex gap-2 text-xs items-center font-bold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          aria-label="Show all transactions"
          onClick={() => navigate("/transactions-history")}
        >
          <span>Show all</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
