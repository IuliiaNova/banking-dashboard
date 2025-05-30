import { v4 as uuidv4 } from "uuid";
import type { Transaction, TransactionRaw } from "../models/transactions";

export function mapRawTransactions(rawData: TransactionRaw[]): Transaction[] {
  return rawData.map((transaction) => ({
    id: uuidv4(),
    date: transaction.Date,
    amount: Math.abs(transaction.Amount),
    description: transaction.Description,
    type: transaction.Type,
  }));
}
