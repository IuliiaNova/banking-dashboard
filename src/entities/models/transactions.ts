export type TransactionType = "Deposit" | "Withdrawal";

export type TransactionMethod = "bizum" | "transfer" | "withdrawal";

export type SelectOperationType = TransactionMethod | "undo" | "reuse"

export interface TransactionRaw {
  Id?: string;
  Date: string;
  Amount: number;
  Description: string;
  Type: TransactionType;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  type: TransactionType;
}
