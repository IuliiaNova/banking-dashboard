import React from "react";
import { Upload } from "lucide-react";
import type { Transaction } from "../../../../entities/models/transactions";
import type { Dispatch } from "../../store/transactions.context";
import { parseCSVToTransactions } from "../../services/csv";
import { mergeTransactions } from "../../utils/mergeTransactios";
import type { AlertType } from "../../../../shared/store/alert/alert.context";

interface CSVUploaderProps {
  onClick: () => void;
  transactions: Transaction[];
  dispatch: Dispatch;
  showAlert: ({ type, message }: { type: AlertType; message: string }) => void;
}

const CSVUploader: React.FC<CSVUploaderProps> & {
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    transactions: Transaction[],
    dispatch: Dispatch,
    showAlert: ({ type, message }: { type: AlertType; message: string }) => void
  ) => void;
} = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Upload CSV file"
    className="text-sm flex items-center justify-center gap-2 px-2 py-2 border border-rose-base text-rose-base rounded-md transition-colors hover:border-rose-hover hover:text-rose-hover active:border-rose-active active:text-rose-active focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
  >
    <Upload size={15} aria-hidden="true" />
    Upload CSV
  </button>
);

CSVUploader.handleFileChange = (e, transactions, dispatch, showAlert) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const isCSV =
    file.type === "text/csv" || file.name.toLowerCase().endsWith(".csv");

  if (!isCSV) {
    showAlert({ type: "error", message: "Please upload a valid CSV file." });
    e.target.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const text = event.target?.result;
    if (typeof text === "string") {
      try {
        const newTransactions = parseCSVToTransactions(text);
        const merged = mergeTransactions(transactions, newTransactions);

        dispatch({ type: "SET", payload: merged });
        showAlert({ type: "success", message: "CSV uploaded successfully." });
      } catch (error) {
        showAlert({ type: "error", message: "Error uploading CSV." });
        console.error(error);
      }
    }
  };

  reader.readAsText(file);
  e.target.value = "";
};

export default CSVUploader;
