import React, { useMemo, useState } from "react";
import { useTransactions } from "../../../features/transactions/store/transactions.context";
import TransactionFilters from "./TransactionFilters";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import type {
  SelectOperationType,
  Transaction,
} from "../../../entities/models/transactions";
import { useCurrency } from "../../../shared/store/currency/currency.context";
import { convertValue } from "../../../shared/utils/calculate-balance";

const PAGE_SIZE = 20;

interface Props {
  title: string;
  setSelected?: React.Dispatch<
    React.SetStateAction<SelectOperationType | null>
  >;
  onClick?: (updateTransaction: Transaction) => void;
}

const HistoryToManage = ({ title, setSelected, onClick }: Props) => {
  const {
    state: { transactions },
  } = useTransactions("History");
  const { currency } = useCurrency();

  const [filter, setFilter] = useState({
    from: "",
    to: "",
    type: "Withdrawal",
    description: "",
    page: 1,
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilter({ ...filter, [e.target.name]: e.target.value, page: 1 });
  };

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => {
        const date = new Date(t.date);
        const from = filter.from ? new Date(filter.from) : null;
        const to = filter.to ? new Date(filter.to) : null;

        return (
          t.type === "Withdrawal" &&
          (!from || date >= from) &&
          (!to || date <= to) &&
          t.description.toLowerCase().includes(filter.description.toLowerCase())
        );
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, filter]);

  const paginated = filtered.slice(
    (filter.page - 1) * PAGE_SIZE,
    filter.page * PAGE_SIZE
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  return (
    <section className="w-full max-w-3xl mx-auto">
      <button
        type="button"
        className="font-medium pb-2 transition flex gap-2 items-center"
        onClick={() => setSelected?.(null)}
      >
        <ArrowLeft color="#ef1660" />
        <span className="text-rose-base">Go back</span>
      </button>
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-sm text-rose-base hover:text-color-rose-hover cursor-pointer"
          >
            {showFilters ? (
              <SlidersHorizontal color="#ef1660" size={20} />
            ) : (
              <SlidersHorizontal color="#71717A" size={20} />
            )}
          </button>
        </div>
      </div>

      {showFilters && (
        <TransactionFilters
          filter={filter}
          withType={false}
          onChange={handleChange}
        />
      )}

      <div className="h-[600px] overflow-y-auto space-y-2 pr-1 scroll-smooth scroll-hidden">
        {paginated.length > 0 ? (
          paginated.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 border border-gray-300 dark:border-gray-100 rounded shadow-sm flex justify-between items-center bg-white dark:bg-background-dark hover:bg-gray-100 dark:hover:bg-gray-300 cursor-pointer"
              onClick={() => onClick?.(transaction)}
            >
              <div className="w-[35%]">
                <p className="font-bold text-sm text-gray-800 dark:text-gray-100">
                  {transaction.date}
                </p>
              </div>
              <div className="w-[40%]">
                <p className="font-medium text-sm text-gray-800 dark:text-gray-100">
                  {transaction.description}
                </p>
              </div>
              <div
                className={`text-sm font-bold w-[25%] ${
                  transaction.type === "Deposit"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {convertValue(currency, transaction.amount).toFixed(2)}
                {currency === "EUR" ? "€" : "$"}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm mt-10">
            No hay transacciones para mostrar.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setFilter({ ...filter, page: idx + 1 })}
              className={`px-3 py-1 rounded border text-sm transition ${
                filter.page === idx + 1
                  ? "bg-rose-base text-white"
                  : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default HistoryToManage;
