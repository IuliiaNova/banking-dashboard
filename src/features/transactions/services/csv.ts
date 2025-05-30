import type { Transaction, TransactionType } from "../../../entities/models/transactions";

export const convertToCSV = (data: Transaction[]): string => {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]).map((key) => key.toUpperCase());
  const rows = data.map((row) =>
    Object.values(row)
      .map((value) => {
        if (value == null) return "";
        const str = value.toString();
        return str.includes(",") || str.includes("\n") || str.includes('"')
          ? `"${str.replace(/"/g, '""')}"`
          : str;
      })
      .join(",")
  );

  return [headers.join(","), ...rows].join("\r\n");
};

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
      id: raw.id || "",
      date: raw.date,
      amount: parseFloat(raw.amount) || 0,
      description: raw.description || "",
      type: (raw.type as TransactionType) || "Deposit",
    };
  });
};
