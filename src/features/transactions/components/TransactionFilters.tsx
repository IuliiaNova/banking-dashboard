import React from "react";

type Props = {
  filter: {
    from: string;
    to: string;
    type: string;
    description: string;
  };
  withType?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

const TransactionFilters = ({ filter, withType = true, onChange }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-4">
      <div className="flex gap-2">
        <input
          type="date"
          name="from"
          value={filter.from}
          onChange={onChange}
          className="border rounded px-2 py-1 text-sm w-full sm:w-auto dark:bg-[var(--color-background-dark)] dark:text-white"
        />
        <input
          type="date"
          name="to"
          value={filter.to}
          onChange={onChange}
          className="border rounded px-2 py-1 text-sm w-full sm:w-auto dark:bg-[var(--color-background-dark)] dark:text-white"
        />
      </div>
      <input
        type="text"
        name="description"
        value={filter.description}
        onChange={onChange}
        placeholder="Buscar descripción"
        className="border rounded px-2 py-1 text-sm w-full sm:w-auto dark:bg-[var(--color-background-dark)] dark:text-white"
      />
      {withType && (
        <select
          name="type"
          value={filter.type}
          onChange={onChange}
          className="border rounded px-2 py-1 text-sm w-full sm:w-auto dark:bg-[var(--color-background-dark)] dark:text-white"
        >
          <option value="All">Todos</option>
          <option value="Deposit">Depósitos</option>
          <option value="Withdrawal">Retiros</option>
        </select>
      )}
    </div>
  );
};

export default TransactionFilters;
