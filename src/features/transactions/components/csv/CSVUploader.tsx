import React from "react";
import { Upload } from "lucide-react";
import { parseCSVToTransactions } from "../../services/csv";
import type { Dispatch } from "../../store/transactions.context";

interface Props {
  onClick: () => void;
}

const CSVUploader: React.FC<Props> & {
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
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

CSVUploader.handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const text = event.target?.result;
    if (typeof text === "string") {
      try {
        const transactions = parseCSVToTransactions(text);
        dispatch({ type: "SET", payload: transactions });
        alert("CSV uploaded and transactions updated.");
      } catch (err) {
        alert("Error parsing CSV.");
        console.error(err);
      }
    }
  };

  reader.readAsText(file);
  e.target.value = ""; // reset input
};

export default CSVUploader;
