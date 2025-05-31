// src/features/transactions/pages/TransactionFormEntry.tsx

import { useState } from "react";
import type { TransactionMethod } from "../../../entities/models/transactions";
import { SelectTransactionMethod } from "./SelectTransactionType";
import { TransferForm } from "./TransferForm";
import { WithdrawalForm } from "./WithdrawalForm";
import { BizumForm } from "./BizumForm";

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
          {selected === "transfer" && <TransferForm setSelected={setSelected} />}
          {selected === "bizum" && <BizumForm setSelected={setSelected} />}
          {selected === "withdrawal" && <WithdrawalForm setSelected={setSelected} />}
        </div>
      )}
    </div>
  );
};
