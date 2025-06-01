import React from "react";
import { Download } from "lucide-react";
import type { Transaction } from "../../../../entities/models/transactions";
import { convertToCSV } from "../../services/csv";
import type { AlertType } from "../../../../shared/store/alert.context";

interface Props {
  transactions: Transaction[];
  showAlert: ({ type, message }: { type: AlertType; message: string }) => void;
}

const CSVDownloader: React.FC<Props> = ({ transactions, showAlert }) => {
  const handleDownload = () => {
    if (!transactions || transactions.length === 0) {
      alert("No transactions to download.");
      return;
    }

    const csv = convertToCSV(transactions);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showAlert({ type: "success", message: "CSV downloaded successfully." });
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      aria-label="Download CSV file"
      className="text-sm flex items-center justify-center gap-2 px-2 py-2 border border-rose-base text-rose-base rounded-md transition-colors hover:border-rose-hover hover:text-rose-hover active:border-rose-active active:text-rose-active focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <Download size={15} aria-hidden="true" />
      Download CSV
    </button>
  );
};

export default CSVDownloader;
