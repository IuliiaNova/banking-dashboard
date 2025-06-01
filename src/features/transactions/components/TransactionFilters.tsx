import React from "react";
import Select, { type SelectOption } from "../../../shared/components/ui/Select";

const OPTIONS: SelectOption[] = [
  { value: "All", label: "All types" },
  { value: "Deposit", label: "Deposit" },
  { value: "Withdrawal", label: "Withdrawal" },
];

type Props = {
  filter: {
    from: string;
    to: string;
    type: string;
    description: string;
  };
  withType?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: string } }
  ) => void;
};

const TransactionFilters = ({ filter, withType = true, onChange }: Props) => {
  const handleCustomChange = (val: string) => {
    onChange({ target: { name: "type", value: val } });
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-3 mb-4 w-full">
      <div className="flex gap-2 sm:gap-2 w-full sm:w-auto">
        <input
          type="date"
          name="from"
          value={filter.from}
          onChange={onChange}
          placeholder="From"
          className="border border-rose-base rounded-lg px-2 py-2 text-sm w-full sm:w-36 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-background-dark dark:text-white"
        />
        <input
          type="date"
          name="to"
          value={filter.to}
          onChange={onChange}
          placeholder="To"
          className="border border-rose-base rounded-lg px-2 py-2 text-sm w-full sm:w-36 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-background-dark dark:text-white"
        />
      </div>
      <input
        type="text"
        name="description"
        value={filter.description}
        onChange={onChange}
        placeholder="Search description"
        className="border border-rose-base rounded-lg px-2 py-2 text-sm w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-background-dark dark:text-white"
      />
      {withType && (
        <Select
          name="type"
          value={filter.type}
          options={OPTIONS}
          onChange={handleCustomChange}
        />
      )}
    </div>
  );
};

export default TransactionFilters;
