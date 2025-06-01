// src/features/transactions/pages/TransactionFormEntry.tsx

import { useState } from "react";
import type { SelectOperationType, Transaction } from "../../../entities/models/transactions";
import { SelectTransactionMethod } from "./SelectTransactionType";
import { TransferForm } from "./TransferForm";
import { WithdrawalForm } from "./WithdrawalForm";
import { BizumForm } from "./BizumForm";
import HistoryToManage from "./HistoryToManage";
import { useTransactions } from "../store/transactions.context";

export const TransactionFormEntry = () => {
  const { dispatch } = useTransactions("TransactionFormEntry");
  const [selected, setSelected] = useState<SelectOperationType | null>(null);

  const handleSelect = (method: SelectOperationType) => {
    setSelected(method);
  };

  const handleUndoTransaction = (id: string) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const handleUpdapeTransaction = (id: string, updateTransaction: Transaction) => {
    dispatch({ type: "EDIT", payload: updateTransaction });
  };

  return (
    <div className="px-4 sm:p-6">
      {!selected && <SelectTransactionMethod onSelect={handleSelect} />}
      {selected && (
        <div className="mt-6">
          {selected === "transfer" && (
            <TransferForm setSelected={setSelected} />
          )}
          {selected === "bizum" && <BizumForm setSelected={setSelected} />}
          {selected === "withdrawal" && (
            <WithdrawalForm setSelected={setSelected} />
          )}
          {selected === "undo" && (
            <HistoryToManage
              title="Select operation to undo"
              setSelected={setSelected}
              onClick={handleUndoTransaction}
            />
          )}
          {selected === "reuse" && (
            <HistoryToManage
              title="Select operation to reuse?"
              setSelected={setSelected}
            />
          )}
        </div>
      )}
    </div>
  );
};
