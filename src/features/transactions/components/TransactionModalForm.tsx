import { useState } from "react";
import type { Transaction } from "../../../entities/models/transactions";
import { Modal } from "../../../shared/components/ui/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  mode: "update" | "reuse";
  transaction: Transaction;
  onSubmit: (tx: Transaction) => void;
};

export const TransactionModalForm = ({
  isOpen,
  onClose,
  mode,
  transaction,
  onSubmit,
}: Props) => {
  const [form, setForm] = useState({
    date: transaction.date,
    amount: transaction.amount,
    description: transaction.description,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };
  

  const handleSubmit = () => {
    const newTx: Transaction = {
      ...transaction,
      ...form,
      id: mode === "reuse" ? crypto.randomUUID() : transaction.id,
    };
    onSubmit(newTx);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "update" ? "Update Transaction" : "Reuse Transaction"}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            min={form.date ? form.date : new Date().toISOString().split("T")[0]}
            className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Amount
          </label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-20 px-4 py-2 text-sm font-medium rounded bg-rose-base text-white hover:bg-rose-hover focus:outline-none focus:ring-2 focus:ring-rose-active dark:focus:ring-rose-active"
          >
            {mode === "update" ? "Update" : "Reuse"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
