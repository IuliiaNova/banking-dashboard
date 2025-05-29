export type TransactionType = "Deposit" | "Withdrawal";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  type: TransactionType;
}
