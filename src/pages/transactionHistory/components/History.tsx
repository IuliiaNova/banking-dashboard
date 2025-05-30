import React, { useMemo, useState } from "react";
import { useTransactions } from "../../../features/transactions/store/transactions.context";
import TransactionFilters from "./TransactionFilters";

const PAGE_SIZE = 20;

const History = () => {
  const {
    state: { transactions },
  } = useTransactions("History");

  const [filter, setFilter] = useState({
    from: "",
    to: "",
    type: "All",
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
          (!from || date >= from) &&
          (!to || date <= to) &&
          (filter.type === "All" || t.type === filter.type) &&
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
    <section className="w-full max-w-3xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Transaction History
        </h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-sm text-[var(--color-rose-base)] hover:text-[var(--color-rose-hover)]"
        >
          {showFilters ? "Hide filters" : "Show filters"}
        </button>
      </div>

      {showFilters && (
        <TransactionFilters filter={filter} onChange={handleChange} />
      )}

      <div className="h-[600px] overflow-y-auto space-y-2 pr-1 scroll-smooth scroll-hidden">
        {paginated.length > 0 ? (
          paginated.map((t) => (
            <div
              key={t.id}
              className="p-4 border rounded shadow-sm flex justify-between items-center bg-white dark:bg-[var(--color-background-dark)]"
            >
              <div>
                <p className="font-semibold text-sm dark:text-white">
                  {t.description}
                </p>
                <p className="text-xs text-gray-500">{t.date}</p>
              </div>
              <div
                className={`text-sm font-bold ${
                  t.type === "Deposit"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {t.type === "Withdrawal" ? "-" : "+"}€{t.amount.toFixed(2)}
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
                  ? "bg-[var(--color-rose-base)] text-white"
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

export default History;
