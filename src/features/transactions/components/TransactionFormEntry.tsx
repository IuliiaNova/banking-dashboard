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
    <div className="p-4 sm:p-6">
      {!selected && (
        <SelectTransactionMethod onSelect={handleSelect} />
      )}

      {selected && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4 capitalize">
            {selected === "transfer" && <TransferForm />}
            {selected === "bizum" && "Bizum Form"}
            {selected === "withdraw" && "Withdraw Form"}
          </h2>

          {/* Future step: Render correct form here based on selected */}
        </div>
      )}
    </div>
  );
};
