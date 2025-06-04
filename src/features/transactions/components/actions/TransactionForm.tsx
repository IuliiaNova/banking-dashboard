import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import type { SelectOperationType, Transaction } from "../../../../entities/models/transactions";
import { useTransactions } from "../../store/transactions.context";
import { useAlert } from "../../../../shared/store/alert/alert.context";
import Select, { type SelectOption } from "../../../../shared/components/ui/Select";
import { calculateBalance } from "../../../../shared/utils/calculate-balance";

const OPTIONS: Array<SelectOption> = [
  { value: "Deposit", label: "Deposit" },
  { value: "Withdrawal", label: "Withdrawal" },
];

const schema = z.object({
  type: z.enum(["Deposit", "Withdrawal"]),
  amount: z.number().min(0.01, "Amount must be greater than zero"),
  description: z.string().min(1, "Description is required"),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  setSelected?: React.Dispatch<
    React.SetStateAction<SelectOperationType | null>
  >;
}

export const TransactionForm = ({ setSelected }: Props) => {
  const { state, dispatch } = useTransactions("TransactionForm");
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue, // <-- importante
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "Withdrawal",
      amount: 0,
      description: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const type = watch("type");
  const amount = watch("amount");

  const currentBalance =  calculateBalance(state.transactions)

  const isOverdraft = type === "Withdrawal" && amount > currentBalance;

  const updateLocalStorage = (transactions: Transaction[]) => {
    localStorage.setItem("transactionsData", JSON.stringify(transactions));
  };

  const onSubmit = (data: FormValues) => {
    const newTransaction: Transaction = {
      id: uuid(),
      date: data.date,
      amount:
        data.type === "Withdrawal"
          ? -Math.abs(data.amount)
          : Math.abs(data.amount),
      description: data.description,
      type: data.type,
    };

    let updatedTransactions: Transaction[] = [];

    dispatch({ type: "ADD", payload: newTransaction });
    updatedTransactions = [...state.transactions, newTransaction];

    showAlert({
      message: "Operation was completed successfully",
      type: "success",
    });

    updateLocalStorage(updatedTransactions);
    reset();
    setSelected?.(null);
    navigate("/transactions-history");
  };

  // Aquí sincronizas el Select custom con RHF
  const handleCustomChange = (optionValue: string) => {
    setValue("type", optionValue as "Deposit" | "Withdrawal");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-50 dark:bg-background-extra-dark rounded-xl p-4 sm:p-6 shadow space-y-6 max-w-lg mx-auto relative z-10"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {type === "Withdrawal" ? "New Withdrawal" : "New Deposit"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">
            Operation type
          </label>
          <Select
            name="type"
            value={type}
            options={OPTIONS}
            onChange={handleCustomChange}
          />
        </div>

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
            max={new Date().toISOString().split("T")[0]}
          />
          <p className="text-xs text-gray-500 mt-1">
            By default, the date is set to today. Due to the type of operation,
            the date cannot be changed
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="submit"
          disabled={isOverdraft}
          className="bg-rose-base hover:bg-rose-hover text-white font-medium py-2 px-4 rounded-md transition"
        >
          {type === "Withdrawal" ? "Withdraw Money" : "Deposit Money"}
        </button>
        <button
          type="button"
          className="bg-gray-500 hover:bg-rose-hover text-white font-medium py-2 px-4 rounded-md transition"
          onClick={() => setSelected?.(null)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
