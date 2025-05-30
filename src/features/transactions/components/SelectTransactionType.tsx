import type { TransactionMethod } from "../../../entities/models/transactions";

interface Props {
  onSelect: (method: TransactionMethod) => void;
}

const OPTIONS: { key: TransactionMethod; label: string }[] = [
  { key: "transfer", label: "Make a Transaction" },
  { key: "bizum", label: "Send via Bizum" },
  { key: "withdrawal", label: "Withdrawal Money" },
];

export const SelectTransactionMethod = ({ onSelect }: Props) => {
  return (
    <section className="max-w-md w-full mx-auto p-6 rounded-2xl shadow-md bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] transition-colors">
      <h2 className="text-xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
        What would you like to do?
      </h2>

      <div className="flex flex-col gap-4">
        {OPTIONS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`
                bg-[var(--color-rose-base)] 
                hover:bg-[var(--color-rose-hover)] 
                active:bg-[var(--color-rose-active)]
                text-white 
                font-medium 
                py-3 
                px-4 
                rounded-xl 
                transition 
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2 
                focus:ring-[var(--color-rose-hover)] 
                focus:ring-offset-white 
                dark:focus:ring-offset-[var(--color-background-dark)]
              `}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
};
