// src/features/transactions/pages/TransactionFormEntry.tsx
import { useState } from "react";
import type { SelectOperationType, Transaction } from "../../../entities/models/transactions";
import { SelectTransactionMethod } from "./SelectTransactionType";
import { TransferForm } from "./TransferForm";
import { WithdrawalForm } from "./WithdrawalForm";
import { BizumForm } from "./BizumForm";
import HistoryToManage from "./HistoryToManage";
import { useTransactions } from "../store/transactions.context";
import { TransactionModalForm } from "../components/TransactionModalForm";
import { useAlert } from "../../../shared/store/alert.context";
import { useNavigate } from "react-router-dom";

export const TransactionFormEntry = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const { dispatch } = useTransactions("TransactionFormEntry");
  const [selected, setSelected] = useState<SelectOperationType | null>(null);
  const [modalMode, setModalMode] = useState<"update" | "reuse" | null>(null);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

  const handleSelect = (method: SelectOperationType) => setSelected(method);

  const openModal = (transaction: Transaction, mode: "update" | "reuse") => {
    setTransactionToEdit(transaction);
    setModalMode(mode);
  };

  const closeModal = () => {
    setTransactionToEdit(null);
    setModalMode(null);
  };

  const handleSubmit = (updated: Transaction) => {
    dispatch({
      type: modalMode === "update" ? "EDIT" : "ADD",
      payload: updated,
    });

    showAlert({
      message: "Operation was completed successfully",
      type: "success",
    });
    navigate("/transactions-history")
  };

  const handleUndoTransaction = (tx: Transaction) =>{
    dispatch({ type: "REMOVE", payload: tx.id })
    showAlert({
      message: "Operation was deleted successfully",
      type: "success",
    });
  }

  return (
    <div className="px-4 sm:p-6">
      {!selected && <SelectTransactionMethod onSelect={handleSelect} />}

      {selected && (
        <div className="mt-6">
          {selected === "transfer" && <TransferForm setSelected={setSelected} />}
          {selected === "bizum" && <BizumForm setSelected={setSelected} />}
          {selected === "withdrawal" && <WithdrawalForm setSelected={setSelected} />}
          {selected === "undo" && (
            <HistoryToManage
              title="Select operation to UNDO"
              setSelected={setSelected}
              onClick={handleUndoTransaction}
            />
          )}
          {(selected === "update" || selected === "reuse") && (
            <HistoryToManage
              title={`Select operation to ${selected.toUpperCase()}`}
              setSelected={setSelected}
              onClick={(t) => openModal(t, selected)}
            />
          )}
        </div>
      )}

      {transactionToEdit && modalMode && (
        <TransactionModalForm
          isOpen={!!transactionToEdit}
          onClose={closeModal}
          mode={modalMode}
          transaction={transactionToEdit}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
