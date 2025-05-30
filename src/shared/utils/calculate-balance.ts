import type { Transaction } from "../../entities/models/transactions";

export function calculateBalance(transactions: Transaction[]): number {
    return transactions.reduce((acc, tx) => {
      if (tx.type === "Deposit") {
        return acc + tx.amount;
      } else if (tx.type === "Withdrawal") {
        return acc - tx.amount;
      }
      return acc;
    }, 0);
  }
  