import type { Transaction } from "../../entities/models/transactions";

export function calculateBalance(transactions: Transaction[]): number {
  return transactions.reduce((acc, tx) => acc + tx.amount, 0);
}

const exchangeRate = 1.1;

export const convertValue = (currency: string | number, value: number) => {
  if (currency === "USD") {
    
    return value * exchangeRate;
  }
  return value;
};