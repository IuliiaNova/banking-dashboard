import React, { useRef } from "react";
import { Upload, Download } from "lucide-react";
import { useTransactions } from "../store/transactions.context";
import type {
  Transaction,
  TransactionType,
} from "../../../entities/models/transactions";

const CSVManage = () => {
  const {
    state: { transactions },
    dispatch,
  } = useTransactions("CSVManage");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertToCSV = (data: Array<Transaction>): string => {
    if (data.length === 0) return "";

    const headers = Object.keys(data[0]).map((key) => key.toUpperCase());

    const rows = data.map((row) =>
      Object.values(row)
        .map((value) => {
          if (value === null || value === undefined) return "";
          const str = value.toString();
          const escaped =
            str.includes(",") || str.includes("\n") || str.includes('"')
              ? `"${str.replace(/"/g, '""')}"`
              : str;
          return escaped;
        })
        .join(",")
    );

    return [headers.join(","), ...rows].join("\r\n");
  };

  const handleDownload = () => {
    if (!transactions || transactions.length === 0) {
      alert("No transactions available to download.");
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
  };

  const onUploadClick = () => {
    fileInputRef.current?.click();
  };

  const parseCSVToTransactions = (csvText: string): Transaction[] => {
    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length === 0) return [];

    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

    return lines.slice(1).map((line) => {
      const values = line
        .split(",")
        .map((v) => v.trim().replace(/^"|"$/g, "").replace(/""/g, '"'));

      const rawObj: Record<string, string> = {};
      headers.forEach((header, i) => {
        rawObj[header] = values[i] ?? "";
      });

      const transaction: Transaction = {
        id: rawObj.id || "",
        date: rawObj.date,
        amount: parseFloat(rawObj.amount) || 0,
        description: rawObj.description || "",
        type: (rawObj.type as TransactionType) || "Deposit",
      };

      return transaction;
    });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        try {
          const parsedTransactions = parseCSVToTransactions(text);
          dispatch({ type: "SET", payload: parsedTransactions });
          alert("CSV uploaded and transactions updated.");
        } catch (error) {
          alert("Error parsing CSV file.");
          console.error(error);
        }
      }
    };
    reader.readAsText(file);

    e.target.value = "";
  };

  return (
    <>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={onFileChange}
        className="hidden"
        aria-hidden="true"
      />
      <div className="flex sm:flex-row flex-wrap gap-2 mb-4">
      <button
          type="button"
          onClick={onUploadClick}
          aria-label="Upload CSV file"
          className="text-sm flex items-center justify-center gap-2 px-2 py-2 border border-rose-base text-rose-base rounded-md transition-colors hover:border-rose-hover hover:text-rose-hover active:border-rose-active active:text-rose-active focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <Upload size={15} aria-hidden="true" />
          Upload CSV
        </button>

        <button
          type="button"
          onClick={handleDownload}
          aria-label="Download CSV file"
          className="text-sm flex items-center justify-center gap-2 px-2 py-2 border border-rose-base text-rose-base rounded-md transition-colors hover:border-rose-hover hover:text-rose-hover active:border-rose-active active:text-rose-active focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <Download size={15} aria-hidden="true" />
          Download CSV
        </button>
      </div>
    </>
  );
};

export default CSVManage;
