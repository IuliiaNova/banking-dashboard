import { v4 as uuidv4 } from "uuid";
import type { Transaction, TransactionType } from "../../../entities/models/transactions";

export function convertToCSV(transactions: Record<string, any>[]): string {
  if (transactions.length === 0) return "";

  const formatHeader = (key: string) =>
    key
      .replace(/_/g, " ")
      .replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

  const keys = Object.keys(transactions[0]);

  const headers = keys.map(formatHeader).join(",");

  const rows = transactions
    .map(tx =>
      keys
        .map(key => `"${String(tx[key]).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  return `${headers}\n${rows}`;
}

export const parseCSVToTransactions = (csv: string): Transaction[] => {
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

  return lines.slice(1).map((line) => {
    const values = line
      .split(",")
      .map((v) => v.trim().replace(/^"|"$/g, "").replace(/""/g, '"'));

    const raw: Record<string, string> = {};
    headers.forEach((h, i) => {
      raw[h] = values[i] ?? "";
    });

    return {
      id: raw.id ?? uuidv4(),
      date: raw.date,
      amount: parseFloat(raw.amount) || 0,
      description: raw.description || "",
      type: (raw.type as TransactionType) || "Deposit",
    };
  });
};
