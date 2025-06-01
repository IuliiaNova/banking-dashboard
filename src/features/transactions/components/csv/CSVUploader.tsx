import React from "react";
import { Upload } from "lucide-react";
import type { Transaction } from "../../../../entities/models/transactions";
import type { Dispatch } from "../../store/transactions.context";
import { parseCSVToTransactions } from "../../services/csv";
import { mergeTransactions } from "../../utils/mergeTransactios";

interface CSVUploaderProps {
  onClick: () => void;
  transactions: Transaction[];
  dispatch: Dispatch;
}

const CSVUploader: React.FC<CSVUploaderProps> & {
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    transactions: Transaction[],
    dispatch: Dispatch
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

CSVUploader.handleFileChange = (e, transactions, dispatch) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const text = event.target?.result;
    if (typeof text === "string") {
      try {
        const newTransactions = parseCSVToTransactions(text);
        const merged = mergeTransactions(transactions, newTransactions);

        dispatch({ type: "SET", payload: merged });
        alert("CSV uploaded and transactions merged.");
      } catch (error) {
        alert("Error parsing CSV.");
        console.error(error);
      }
    }
  };

  reader.readAsText(file);
  e.target.value = "";
};

export default CSVUploader;
