import type { Transaction } from "../../entities/models/transactions";

export function calculateBalance(transactions: Transaction[]): number {
  return transactions.reduce((acc, tx) => acc + tx.amount, 0);
}

