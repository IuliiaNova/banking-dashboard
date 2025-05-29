export type TransactionType = "Deposit" | "Withdrawal";

export interface TransactionRaw {
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
