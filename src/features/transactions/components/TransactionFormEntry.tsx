// src/features/transactions/pages/TransactionFormEntry.tsx
import { useState } from "react";
import type {
  SelectOperationType,
  Transaction,
} from "../../../entities/models/transactions";
import { SelectTransactionMethod } from "./SelectTransactionType";
import HistoryToManage from "./HistoryToManage";
import { useTransactions } from "../store/transactions.context";
import { useAlert } from "../../../shared/store/alert/alert.context";
import { useNavigate } from "react-router-dom";
import { ModalConfirm } from "../../../shared/components/ui/ModalConfirm";
import { TransferForm } from "./actions/TransferForm";
import { BizumForm } from "./actions/BizumForm";
import { TransactionForm } from "./actions/TransactionForm";
import { TransactionModalForm } from "./actions/TransactionModalForm";

const TransactionFormEntry = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const { dispatch } = useTransactions("TransactionFormEntry");
  const [selected, setSelected] = useState<SelectOperationType | null>(null);
  const [modalMode, setModalMode] = useState<"update" | "reuse" | null>(null);
  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] =
    useState<Transaction | null>(null);

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
    navigate("/transactions-history");
  };

  const handleUndoTransaction = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
    setIsConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    if (transactionToDelete) {
      dispatch({ type: "REMOVE", payload: transactionToDelete.id });
      showAlert({
        message: "Operation was deleted successfully",
        type: "success",
      });
      setTransactionToDelete(null);
    }
    setIsConfirmationOpen(false);
  };

  return (
    <div className="px-4 sm:px-6">
      {!selected && <SelectTransactionMethod onSelect={handleSelect} />}
      {selected && (
        <div className="mt-6">
          {selected === "transfer" && (
            <TransferForm setSelected={setSelected} />
          )}
          {selected === "bizum" && <BizumForm setSelected={setSelected} />}
          {selected === "withdrawal" && (
            <TransactionForm setSelected={setSelected} />
          )}
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
      <ModalConfirm
        isOpen={isConfirmationOpen}
        onClose={() => {
          setIsConfirmationOpen(false);
          setTransactionToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Confirm Undo Action"
        description="Are you sure you want to delete this transaction?"
      />
    </div>
  );
};

export default TransactionFormEntry;
