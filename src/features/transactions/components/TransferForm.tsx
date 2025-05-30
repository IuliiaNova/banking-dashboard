import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransactions } from "../store/transactions.context";
import { v4 as uuid } from "uuid";
import clsx from "clsx";
import type { Transaction } from "../../../entities/models/transactions";

const schema = z.object({
  amount: z.number().min(0.01, "Amount must be greater than zero"),
  description: z.string().min(1, "Description is required"),
  date: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    "Invalid date format"
  ),
  type: z.enum(["Deposit", "Withdrawal"]),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  initial?: Transaction;
  onSuccess?: () => void;
}

export const TransferForm = ({ initial, onSuccess }: Props) => {
  const { state, dispatch } = useTransactions('TransferForm');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: initial || {
      amount: 0,
      description: "",
      date: new Date().toISOString().split("T")[0],
      type: "Deposit",
    },
  });

  const amount = watch("amount");
  const type = watch("type");

  const currentBalance = state.transactions.reduce(
    (acc, tx) => acc + tx.amount,
    0
  );

  const isOverdraft =
    type === "Withdrawal" && amount > currentBalance && !initial;

  const onSubmit = (data: FormValues) => {
    const newTransaction: Transaction = {
      id: initial?.id || uuid(),
      ...data,
      amount: data.type === "Withdrawal" ? -Math.abs(data.amount) : data.amount,
    };

    if (initial) {
      dispatch({ type: "EDIT", payload: newTransaction });
    } else {
      dispatch({ type: "ADD", payload: newTransaction });
    }

    reset();
    onSuccess?.();
  };

  const handleUndo = () => {
    dispatch({ type: "UNDO" });
  };

  const handleReuse = () => {
    if (!initial) return;
    setValue("amount", Math.abs(initial.amount));
    setValue("description", initial.description);
    setValue("date", new Date().toISOString().split("T")[0]);
    setValue("type", initial.type);
  };

  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className="bg-gray-50 dark:bg-background-extra-dark rounded-xl p-4 sm:p-6 shadow space-y-6 max-w-lg mx-auto relative z-10"
  >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {initial ? "Edit Transaction" : "New Transaction"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">
            Amount (€)
          </label>
          <input
            type="number"
            step="0.01"
            {...register("amount", { valueAsNumber: true })}
            className={clsx(
              "w-full rounded-md px-3 py-2 border",
              "bg-white dark:bg-background-dark",
              "text-gray-900 dark:text-white",
              errors.amount ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.amount && (
            <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>
          )}
          {isOverdraft && (
            <p className="text-xs text-orange-500 mt-1">
              Insufficient balance for withdrawal
            </p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">
            Type
          </label>
          <select
            {...register("type")}
            className="relative z-50 w-full rounded-md px-3 py-2 border border-gray-300 bg-white dark:bg-background-dark dark:text-white"
          >
            <option value="Deposit">Deposit</option>
            <option value="Withdrawal">Withdrawal</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">
            Description
          </label>
          <input
            type="text"
            {...register("description")}
            className={clsx(
              "w-full rounded-md px-3 py-2 border",
              "bg-white dark:bg-background-dark",
              "text-gray-900 dark:text-white",
              errors.description ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">
            Date
          </label>
          <input
            type="date"
            {...register("date")}
            className={clsx(
              "w-full rounded-md px-3 py-2 border",
              "bg-white dark:bg-background-dark",
              "text-gray-900 dark:text-white",
              errors.date ? "border-red-500" : "border-gray-300"
            )}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="submit"
          disabled={isOverdraft}
          className="bg-[var(--color-rose-base)] hover:bg-[var(--color-rose-hover)] text-white font-medium py-2 px-4 rounded-md transition"
        >
          {initial ? "Update" : "Add"} Transaction
        </button>

        {!initial && (
          <>
            <button
              type="button"
              onClick={handleUndo}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-white font-medium py-2 px-4 rounded-md transition"
            >
              Undo Last
            </button>
            <button
              type="button"
              onClick={handleReuse}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-white font-medium py-2 px-4 rounded-md transition"
            >
              Reuse transaction
            </button>
          </>
        )}
      </div>
    </form>
  );
};
