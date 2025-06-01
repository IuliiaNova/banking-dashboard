import type {
  SelectOperationType,
  TransactionMethod,
} from "../../../entities/models/transactions";

interface Props {
  onSelect: (method: SelectOperationType) => void;
}

const OPTIONS: { key: TransactionMethod; label: string }[] = [
  { key: "transfer", label: "Make a Transaction" },
  { key: "bizum", label: "Send via Bizum" },
  { key: "withdrawal", label: "Withdrawal Money" },
];

const OPTIONS_EXISTS: { key: "undo" | "reuse"; label: string }[] = [
  { key: "undo", label: "Undo Operation" },
  { key: "undo", label: "Update Operation" },
  { key: "reuse", label: "Reuse Operation" },
];

export const SelectTransactionMethod = ({ onSelect }: Props) => {
  return (
    <section className="max-w-md w-full mx-auto p-6 rounded-2xl shadow-md bg-color-background-light dark:bg-background-dark transition-colors">
      <h2 className="text-xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
        What would you like to do?
      </h2>
      <div className="flex flex-col gap-4">
        {OPTIONS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`
                bg-rose-base 
                hover:bg-rose-hover 
                active:bg-rose-active
                text-white 
                font-medium 
                py-3 
                px-4 
                rounded-xl 
                transition 
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2 
                focus:ring--rose-hover 
                focus:ring-offset-white 
                dark:focus:ring-offset-background-dark
                cursor-pointer
              `}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-16">
        {OPTIONS_EXISTS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`
              border-2
                border-rose-base 
                hover:border-rose-hover 
                hover:bg-rose-50
                active:border-rose-active
                text-gray-500
                dark:text-white
                hover:text-rose-hover
                active:text-rose-active
                font-medium 
                py-3 
                px-4 
                rounded-xl 
                transition 
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2 
                focus:ring--rose-hover 
                focus:ring-offset-white 
                dark:focus:ring-offset-background-dark
                cursor-pointer
              `}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
};
