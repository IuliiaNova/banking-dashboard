// src/features/transactions/pages/TransactionFormEntry.tsx

import { useState } from "react";
import type { TransactionMethod } from "../../../entities/models/transactions";
import { SelectTransactionMethod } from "./SelectTransactionType";
import { TransferForm } from "./TransferForm";

export const TransactionFormEntry = () => {
  const [selected, setSelected] = useState<TransactionMethod | null>(null);

  const handleSelect = (method: TransactionMethod) => {
    setSelected(method);
  };

  return (
    <div className="px-4 sm:p-6">
      {!selected && <SelectTransactionMethod onSelect={handleSelect} />}
      {selected && (
        <div className="mt-6">
          {selected === "transfer" && <TransferForm />}
          {selected === "bizum" && "Bizum Form"}
          {selected === "withdrawal" && "Withdraw Form"}
        </div>
      )}
    </div>
  );
};
