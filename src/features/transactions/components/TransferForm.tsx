import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransactions } from "../store/transactions.context";
import { v4 as uuid } from "uuid";
import clsx from "clsx";
import type {
  SelectOperationType,
  Transaction,
} from "../../../entities/models/transactions";
import { useAlert } from "../../../shared/store/alert.context";

const schema = z.object({
  amount: z.number().min(0.01, "Amount must be greater than zero"),
  description: z.string().min(1, "Description is required"),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
  destinationAccount: z
    .string()
    .min(10, "Destination account is required")
    .max(34, "Account number too long")
    .regex(/^[A-Z0-9]+$/, "Invalid account format"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  onSuccess?: () => void;
  setSelected?: React.Dispatch<
    React.SetStateAction<SelectOperationType | null>
  >;
}

export const TransferForm = ({ onSuccess, setSelected }: Props) => {
  const { state, dispatch } = useTransactions("TransferForm");
  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 0,
      description: "",
      date: new Date().toISOString().split("T")[0],
      destinationAccount: "", 
    },
  });

  const amount = watch("amount");

  const currentBalance = state.transactions
    .filter((tx) => tx.type === "Deposit")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const isOverdraft = amount > currentBalance;

  const onSubmit = (data: FormValues) => {
    const newTransaction: Transaction = {
      id: uuid(),
      date: data.date,
      amount: -Math.abs(data.amount),
      description: data.description,
      type: "Withdrawal",
    };

    dispatch({ type: "ADD", payload: newTransaction });
    showAlert({
      message: "Operation was completed successfully",
      type: "success",
    });

    reset();
    onSuccess?.();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-50 dark:bg-background-extra-dark rounded-xl p-4 sm:p-6 shadow space-y-6 max-w-lg mx-auto relative z-10"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        New Transfer
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
            <p className="text-xs text-orange-500 mt-1">Insufficient balance</p>
          )}
        </div>
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">
            Destination Account
          </label>
          <input
            type="text"
            {...register("destinationAccount")}
            className={clsx(
              "w-full rounded-md px-3 py-2 border",
              "bg-white dark:bg-background-dark",
              "text-gray-900 dark:text-white",
              errors.destinationAccount ? "border-red-500" : "border-gray-300"
            )}
            placeholder="ESXX "
          />
          {errors.destinationAccount && (
            <p className="text-xs text-red-500 mt-1">
              {errors.destinationAccount.message}
            </p>
          )}
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
            <p className="text-xs text-red-500 mt-1">
              {errors.description.message}
            </p>
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
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="submit"
          disabled={isOverdraft}
          className="bg-[var(--color-rose-base)] hover:bg-[var(--color-rose-hover)] text-white font-medium py-2 px-4 rounded-md transition"
        >
          Make a Transfer
        </button>
        <button
          type="button"
          disabled={isOverdraft}
          className="bg-gray-600 hover:bg-rose-hover text-white font-medium py-2 px-4 rounded-md transition"
          onClick={() => setSelected?.(null)}
        >
          Go back
        </button>
      </div>
    </form>
  );
};
